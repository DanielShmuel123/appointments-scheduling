import React from "react";
import styles from "./FormError.module.css";
interface IProps {
  message: string;
}
export const FormErrorMessage: React.FC<IProps> = ({ message }) => {
  return <p className={styles.errorMessage}>{message}</p>;
};
