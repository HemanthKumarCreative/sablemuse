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
  mocha: "#6B4F3A",
  chocolate: "#4A3428",
  camel: "#C19A6B",
  tan: "#C4A484",
  taupe: "#8B7E74",
  green: "#4F6F52",
  moss: "#6B7F5A",
  pink: "#E8B4B8",
  "hot pink": "#FF69B4",
  fuchsia: "#E35D8C",
  blush: "#E8B4B8",
  coral: "#E07A5F",
  orange: "#E07A3D",
  yellow: "#E2C044",
  gold: "#C6A15B",
  purple: "#7E5A9B",
  plum: "#6B3A5D",
  burgundy: "#6E2430",
  wine: "#722F37",
  rust: "#B7410E",
  ivory: "#F7F3EA",
  charcoal: "#3A3A3A",
}

export const colorNameToHex = (name: string) => {
  const key = name.trim().toLowerCase()
  if (COLOR_HEX[key]) {
    return COLOR_HEX[key]
  }

  const match = Object.keys(COLOR_HEX)
    .sort((left, right) => right.length - left.length)
    .find((color) => key.includes(color))

  return match ? COLOR_HEX[match] : "#0C0C0C"
}

export const isColorOption = (name: string) => {
  const normalized = name.trim().toLowerCase()
  return normalized === "color" || normalized === "colour"
}

export const isSizeOption = (name: string) => {
  const normalized = name.trim().toLowerCase()
  return normalized === "size" || normalized === "sizes"
}
