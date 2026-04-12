import { useState, useCallback } from "react";

export function useValidation() {
  const [validation, setValidation] = useState({
    isValid: true,
    message: "",
  });
  const [focus, isFocus] = useState(false);

  const validateTitle = useCallback((title) => {
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
  }, []);

  const resetValidation = useCallback(() => {
    setValidation({
      isValid: true,
      message: "",
    });
  }, []);

  return {
    validation,
    validateTitle,
    resetValidation,
    focus,
    isFocus,
  };
}
