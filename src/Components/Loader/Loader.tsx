// Loader.tsx
import React from "react";
import styles from "./loader.module.css";

interface LoaderProps {
  show: boolean;
}

const Loader: React.FC<LoaderProps> = ({ show }) => {
  if (!show) {
    return null;
  }

  return <div className={styles.loader} />;
};

export default Loader;
