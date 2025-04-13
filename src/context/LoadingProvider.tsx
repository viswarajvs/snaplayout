// src/context/LoaderProvider.tsx
import React, { useState } from "react";
import { LoaderContext } from "./LoaderContext";
import { Spin } from "antd";
import "./Loader.css"; // Optional: custom style for overlay

const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {loading && (
        <div className="global-loader">
          <Spin size="large" />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
