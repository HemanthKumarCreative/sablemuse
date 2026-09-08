const COLOR_HEX: Record<string, string> = {
  black: "#0C0C0C",
  white: "#FFFFFF",
  "off white": "#F5F2EB",
  offwhite: "#F5F2EB",
  coconut: "#E8DFD0",
  olive: "#5A6D57",
  sage: "#748C70",
  khaki: "#8B7E66",
  navy: "#1F2A44",
  "dark blue": "#1F2A44",
  blue: "#3B6EA5",
  sky: "#A8C5D4",
  red: "#CA2929",
  lavender: "#C5B4D8",
  beige: "#D8CBB8",
  cream: "#F5F0E6",
  grey: "#8A8A8A",
  gray: "#8A8A8A",
  brown: "#6B4F3A",
  green: "#4F6F52",
  pink: "#E8B4B8",
}

export const colorNameToHex = (name: string) => {
  const key = name.trim().toLowerCase()
  return COLOR_HEX[key] ?? "#0C0C0C"
}

export const isColorOption = (name: string) => {
  const normalized = name.trim().toLowerCase()
  return normalized === "color" || normalized === "colour"
}

export const isSizeOption = (name: string) => {
  const normalized = name.trim().toLowerCase()
  return normalized === "size" || normalized === "sizes"
}
