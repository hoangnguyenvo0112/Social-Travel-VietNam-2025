export function isNumber(value) {
  // Regular expression pattern to match a number
  const numberPattern = /^[-+]?\d*\.?\d+$/;

  return numberPattern.test(value);
}
export function formatMoneyVND(amount) {
  // Convert the number to a string
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount).replace(/\./g, ",").replace("₫", "VNĐ");
}

export function convertMoneyVND(value) {
  let stringNumber = value;
  let numericString = stringNumber.replace(/,| VNĐ/g, "");
  let number = parseInt(numericString);
  return number;
}