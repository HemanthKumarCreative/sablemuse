const FREE_SHIPPING = "Free shipping on United States orders."
const DISPATCH = "Most orders ship in 1–2 business days."
const RETURNS = "Returns within 30 days of delivery for unworn items."

export const shippingCopy = (shipsFromUs?: boolean) => {
  const origin = shipsFromUs ? "Ships from the United States." : ""
  const summary = [origin, FREE_SHIPPING, DISPATCH, RETURNS].filter(Boolean).join(" ")

  return {
    summary,
    detail: summary,
  }
}
