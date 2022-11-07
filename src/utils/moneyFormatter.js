const moneyFormatter = (number) => {
  const money = parseInt(number);
  return new Intl.NumberFormat("id-id", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(money);
};

export default moneyFormatter;
