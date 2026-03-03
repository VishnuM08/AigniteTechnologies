import React, { useEffect, useRef, useState } from "react";

/**
 * Detects whether the user is behind a VPN / corporate proxy (e.g. ZScaler)
 * by measuring round-trip time of a tiny same-origin fetch.
 * ZScaler and similar TLS-intercepting proxies add noticeable overhead (typically >100ms).
 */
async function detectVpnOrProxy(): Promise<boolean> {
  try {
    const start = performance.now();
    // Fetch the favicon (tiny, always cached) purely to measure proxy overhead
    await fetch("/favicon.ico", {
      method: "HEAD",
      cache: "no-store",
      signal: AbortSignal.timeout(2000),
    });
    const elapsed = performance.now() - start;
    // If the same-origin round-trip exceeds 150ms it very likely went through
    // a TLS-inspecting proxy (ZScaler, Netskope, etc.)
    return elapsed > 150;
  } catch {
    // Timeout or blocked — treat as proxy-like environment
    return true;
  }
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isProxyEnv, setIsProxyEnv] = useState(false);

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) || window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    setIsTouchDevice(isMobile);
    if (isMobile) return;

    // --- VPN / ZScaler detection ---
    // Run a quick latency probe. If it's slow, a TLS-inspecting proxy
    // (ZScaler, Netskope, Cisco Umbrella…) is almost certainly involved.
    // In that environment the rAF loop competes with proxy overhead, so
    // we fall back to the native OS cursor for a smooth experience.
    let cleanupCalled = false;
    detectVpnOrProxy().then((isProxy) => {
      if (cleanupCalled) return;
      if (isProxy) {
        setIsProxyEnv(true);
        // Restore the native cursor on the whole page
        document.body.style.cursor = "auto";
        return;
      }
      // Not a proxy — hide the default cursor and run custom one
      document.body.style.cursor = "none";
      startCustomCursor();
    });

    return () => {
      cleanupCalled = true;
      document.body.style.cursor = "auto";
    };
  }, []);

  // Extracted so it can be called only after proxy check resolves
  function startCustomCursor() {
    let mouseX = -100;
    let mouseY = -100;
    // Smoothed trailing coordinates for the ring
    let ringX = -100;
    let ringY = -100;

    let isRunning = true;
    let isHovering = false;

    // Direct DOM manipulation completely bypasses React state for maximum performance
    const animate = () => {
      if (!isRunning) return;

      // Inner dot instantly follows mouse
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Outer ring trails fluidly but faster
      ringX += (mouseX - ringX) * 0.35; // Increased from 0.15 to make the trail snappier and faster
      ringY += (mouseY - ringY) * 0.35;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    const updateMousePos = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const interactiveEl =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer");

      if (interactiveEl && !isHovering) {
        isHovering = true;
        hoverStateOn();
      } else if (!interactiveEl && isHovering) {
        isHovering = false;
        hoverStateOff();
      }
    };

    const hoverStateOn = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        ringRef.current.style.borderColor = "rgba(255, 255, 255, 0.6)";
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = "0";
      }
    };

    const hoverStateOff = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.backgroundColor = "transparent";
        ringRef.current.style.borderColor = "rgba(255, 255, 255, 0.4)";
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePos, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });
    document.addEventListener("mouseenter", handleMouseEnter, {
      passive: true,
    });

    // Start ultra-fast 60fps/120fps hardware loop
    requestAnimationFrame(animate);

    // Return inner cleanup (called when component unmounts)
    return () => {
      isRunning = false;
      window.removeEventListener("mousemove", updateMousePos);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }

  // If on a touch device, proxy/VPN, or cursor left window → use native cursor
  if (isTouchDevice || isProxyEnv || !isVisible) return null;

  return (
    <>
      {/* Outer Fast Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-solid transition-all duration-300 ease-out will-change-transform mix-blend-difference"
        style={{
          width: "36px",
          height: "36px",
          borderColor: "rgba(255, 255, 255, 0.4)",
        }}
      />

      {/* Inner Fast Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-200 flex items-center justify-center mix-blend-difference"
        style={{ width: "6px", height: "6px" }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </div>
    </>
  );
}
