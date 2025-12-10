"use client";

import React from "react";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/navbar";
import SideNav from "./components/sidenav";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface LayoutProps {
  isLoading: boolean;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  isLoading,
  children,
}) => {
  return (
    <div className="overflow-x-hidden max-w-full">
      <Navbar />
      <SideNav isReady={!isLoading} />
      {children}
    </div>
  );
};

export default Layout;
