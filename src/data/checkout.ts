export type ShippingDateOption = {
  id: string
  label: string
}

export type ShippingMethodOption = {
  id: string
  label: string
  detail: string
  price: number
}

export const EXPRESS_DATE_OPTIONS: ShippingDateOption[] = [
  { id: "aug-14", label: "Monday, August 14" },
  { id: "aug-16", label: "Wednesday, August 16" },
  { id: "aug-22", label: "Tuesday, August 22" },
  { id: "aug-25", label: "Friday, August 25" },
]

export const GUARANTEED_OPTIONS: ShippingMethodOption[] = [
  {
    id: "ups-8pm",
    label: "Wednesday, August 11th By 8 PM",
    detail: "UPS Next Day Air Saver",
    price: 24,
  },
  {
    id: "ups-noon",
    label: "Wednesday, August 11th By Noon",
    detail: "UPS Next Day Air Saver",
    price: 24,
  },
]

export const DEMO_CHECKOUT_CONTACT = "jane.doe@email.com"
export const DEMO_CHECKOUT_SHIP_TO =
  "1200 Market Street, Apt 4B, San Francisco, CA 94102, United States"
