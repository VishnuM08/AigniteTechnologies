import React from "react";
import { Outlet, ScrollRestoration } from "react-router";
import { Navigation } from "./Navigation";

import { ScrollProgress } from "./ScrollProgress";
import { BackToTop } from "./BackToTop";
import { ThemeToggle } from "./ThemeToggle";
import { SoundToggle } from "./SoundToggle";
import { LoadingScreen } from "./LoadingScreen";
import { CustomCursor } from "./CustomCursor";

export function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <LoadingScreen />
      <CustomCursor />

      <ScrollProgress />
      <Navigation />
      <BackToTop />
      <ThemeToggle />
      <SoundToggle />
      <main className="min-h-screen bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
        <Outlet />
      </main>
    </>
  );
}
