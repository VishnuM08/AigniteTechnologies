import React from "react";
import { Outlet, ScrollRestoration } from "react-router";
import { Navigation } from "./Navigation";

import { ScrollProgress } from "./ScrollProgress";
import { BackToTop } from "./BackToTop";
import { ThemeToggle } from "./ThemeToggle";
import { LoadingScreen } from "./LoadingScreen";

export function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <LoadingScreen />

      <ScrollProgress />
      <Navigation />
      <BackToTop />
      <ThemeToggle />
      <main className="min-h-screen bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
        <Outlet />
      </main>
    </>
  );
}
