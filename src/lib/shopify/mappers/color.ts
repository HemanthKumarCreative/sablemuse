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
  "sky blue": "#A8C5D4",
  "french blue": "#6E8CA0",
  "royal blue": "#2E4A9B",
  "peacock blue": "#1F6F78",
  strawberry: "#C73E54",
  "gum leaf": "#7D9B76",
  ochre: "#C48A2A",
  chartreuse: "#B5C44A",
  tangerine: "#F28500",
  "dusty pink": "#D4A0A8",
}

const UNKNOWN_COLOR = "#E1DCD6"

const colorKey = (name: string) => name.trim().toLowerCase().replace(/\s+/g, " ")

const colorWords = (key: string) => key.split(/[\s/]+/).filter(Boolean)

export const formatColorName = (name: string) => {
  const collapsed = name.trim().replace(/\s+/g, " ")

  return collapsed
    .split(" ")
    .map((word) => {
      if (word.includes("/") || /\d/.test(word)) {
        return word
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(" ")
}

const JUNK_COLOR_NAMES = new Set([
  "multicolor",
  "multi-color",
  "multi colour",
  "multi-colour",
  "default title",
  "default",
  "n/a",
  "na",
  "none",
])

export const isMeaningfulColorName = (name: string) => {
  const key = colorKey(name)
  if (!key) {
    return false
  }

  return !JUNK_COLOR_NAMES.has(key)
}

export const colorNameToHex = (name: string) => {
  const key = colorKey(name)
  if (COLOR_HEX[key]) {
    return COLOR_HEX[key]
  }

  const words = colorWords(key)
  const match = Object.keys(COLOR_HEX)
    .sort((left, right) => right.length - left.length)
    .find((color) => {
      const parts = colorWords(color)
      if (parts.length === 1) {
        return words.includes(parts[0])
      }

      return key.split(" ").join(" ").includes(color)
    })

  return match ? COLOR_HEX[match] : UNKNOWN_COLOR
}

export const isColorOption = (name: string) => {
  const normalized = name.trim().toLowerCase()
  return normalized === "color" || normalized === "colour"
}

export const isSizeOption = (name: string) => {
  const normalized = name.trim().toLowerCase()
  return normalized === "size" || normalized === "sizes"
}
