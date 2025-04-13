// src/context/LoaderContext.ts
import React from "react";

export interface LoaderContextType {
  showLoader: () => void;
  hideLoader: () => void;
}

export const LoaderContext = React.createContext<LoaderContextType | null>(null);
