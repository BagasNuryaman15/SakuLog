const idrFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0
});

export function formatCurrencyIDR(amount: number) {
  const value = Number.isFinite(amount) ? amount : 0;
  const sign = value < 0 ? "-" : "";

  return `${sign}Rp${idrFormatter.format(Math.abs(Math.round(value)))}`;
}
