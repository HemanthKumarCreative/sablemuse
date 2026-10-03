export const formatMoney = (value: number) => {
  const amount = Number.isFinite(value) ? value : 0

  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const formatPriceLabel = (price: number, priceMax?: number) => {
  const minLabel = `$${formatMoney(price)}`

  if (!priceMax || priceMax <= price) {
    return minLabel
  }

  const spread = priceMax - price
  const ratio = price > 0 ? priceMax / price : 1

  if (spread <= 20 || ratio <= 1.25) {
    return `${minLabel}–$${formatMoney(priceMax)}`
  }

  return `From ${minLabel}`
}
