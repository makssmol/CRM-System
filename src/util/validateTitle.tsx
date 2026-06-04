export const validateTitle = (title: string) => {
    const trimmed = title.trim();

    if (trimmed === "") {
      return {
        isValid: false,
        message: "Это поле не может быть пустым",
      };
    } else if (trimmed.length < 2) {
      return {
        isValid: false,
        message: "Минимальная длина текста 2 символа",
      };
    } else if (trimmed.length >= 64) {
      return {
        isValid: false,
        message: "Максимальная длина текста 64 символа",
      };
    }

    return {
      isValid: true,
      message: "",
    };
  };




