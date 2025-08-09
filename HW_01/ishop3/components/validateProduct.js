export function validateField(field, value) {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return "Поле обязательно";
  }
  if (
    (field === "price" || field === "count") &&
    (isNaN(Number(value)) || Number(value) <= 0)
  ) {
    return "Введите корректное число";
  }
  return null;
}

export function validateProduct(product) {
  const errors = {};
  ["name", "price", "count"].forEach((field) => {
    const error = validateField(field, product[field]);
    if (error) errors[field] = error;
  });
  return errors;
}
// Фото не проверяю, его может не быть
