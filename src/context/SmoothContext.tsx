// src/context/SmoothContext.tsx
import { createContext, useContext } from "react";

export const SmoothContext = createContext<any>(null);

export const useSmooth = () => useContext(SmoothContext);

export const SmoothProvider = SmoothContext.Provider;
