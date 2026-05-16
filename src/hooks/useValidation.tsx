import { useState } from "react";
import { type TodoValidation } from "../types/basicTypes";

export function useValidation(): TodoValidation {
  const [validation, setValidation] = useState({
    isValid: true,
    message: "",
  });

  const validateTitle = (title: string): boolean => {
    const trimmed = title.trim();

    if (trimmed === "") {
      setValidation({
        isValid: false,
        message: "Это поле не может быть пустым",
      });
      return false;
    } else if (trimmed.length < 2) {
      setValidation({
        isValid: false,
        message: "Минимальная длина текста 2 символа",
      });
      return false;
    } else if (trimmed.length >= 64) {
      setValidation({
        isValid: false,
        message: "Максимальная длина текста 64 символа",
      });
      return false;
    }

    setValidation({
      isValid: true,
      message: "",
    });
    return true;
  };


  return {
    validation,
    validateTitle,
  };
}
