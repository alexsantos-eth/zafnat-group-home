"use client";

import React from "react";

import ParticleBackground, {
  GradientBackground,
} from "./components/background";
import Navbar from "./components/navbar";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <GradientBackground />
      <ParticleBackground />
      {children}
    </div>
  );
};

export default Layout;
