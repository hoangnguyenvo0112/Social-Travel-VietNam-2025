function formatMoneyVND(amount) {
  // Convert the number to a string
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount).replace(".", ",").replace("₫", "VNĐ");
}
module.exports = { formatMoneyVND };
