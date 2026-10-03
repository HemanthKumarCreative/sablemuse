const NOISE_PHRASES = [
  "full size",
  "plus size",
  "one size",
  "regular size",
  "curvy fit",
  "curvy",
  "loungewear",
] as const

// Only applied when the title is still long after primary cleanup.
const LONG_TITLE_FILLER = [
  "soft rayon",
  "soft knit",
  "lightweight",
  "three-quarter sleeve",
  "three quarter sleeve",
  "long sleeve",
  "short sleeve",
  "drop shoulder",
] as const

const LONG_TITLE_LIMIT = 40

const NOT_BRAND_WORDS = new Set([
  "washed",
  "floral",
  "soft",
  "ribbed",
  "knit",
  "cotton",
  "linen",
  "lace",
  "button",
  "wrap",
  "maxi",
  "mini",
  "midi",
  "crew",
  "scoop",
  "high",
  "low",
  "wide",
  "skinny",
  "relaxed",
  "oversized",
  "cropped",
  "long",
  "short",
  "solid",
  "printed",
  "classic",
  "casual",
  "elegant",
  "modern",
  "vintage",
  "retro",
  "boho",
  "chic",
  "women",
  "womens",
  "ladies",
  "the",
  "new",
  "best",
  "top",
  "dress",
  "set",
  "jeans",
  "pants",
  "shorts",
  "blouse",
  "tee",
  "shirt",
  "make",
])

// Words that usually start the real product description after a vendor prefix.
const PRODUCT_START_WORDS = new Set([
  "washed",
  "floral",
  "soft",
  "ribbed",
  "knit",
  "cotton",
  "linen",
  "lace",
  "button",
  "wrap",
  "maxi",
  "mini",
  "midi",
  "crew",
  "scoop",
  "v-neck",
  "vneck",
  "high",
  "wide",
  "skinny",
  "relaxed",
  "oversized",
  "cropped",
  "long",
  "short",
  "solid",
  "printed",
  "classic",
  "casual",
  "distressed",
  "pleated",
  "ruched",
  "tied",
  "tie",
  "belted",
])

const FUNCTION_WORDS = new Set(["it", "and", "of", "for", "the", "a", "an", "to", "in"])

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const stripPhrases = (value: string, phrases: readonly string[]) => {
  let result = value

  for (const phrase of phrases) {
    const phrasePattern = new RegExp(
      `\\b${phrase.split(/\s+/).map(escapeRegExp).join("\\s+")}\\b`,
      "gi"
    )
    result = result.replace(phrasePattern, " ")
  }

  return result
}

const normalizeTitle = (value: string) =>
  value
    .replace(/\s{2,}/g, " ")
    .replace(/^[\s\-–—,|/]+|[\s\-–—,|/]+$/g, "")
    .trim()

const normalizeToken = (value: string) =>
  value.toLowerCase().replace(/[^\w-]/g, "")

const stripVendorPrefix = (title: string, vendor?: string | null) => {
  const vendorName = vendor?.trim()
  if (!vendorName) {
    return title
  }

  const vendorPattern = new RegExp(
    `^${escapeRegExp(vendorName)}(?:\\s*[-–—:,|/]\\s*|\\s+)`,
    "i"
  )
  return title.replace(vendorPattern, "")
}

/**
 * Wholesale catalogs often prefix titles with a vendor brand even when
 * Shopify's vendor field does not match.
 */
const stripInferredBrandPrefix = (title: string) => {
  const words = title.split(/\s+/).filter(Boolean)

  if (words.length < 4) {
    return title
  }

  const canStrip = (count: number) => {
    const brandWords = words.slice(0, count)

    if (brandWords.some((word) => word.includes("-"))) {
      return false
    }

    if (
      brandWords.some((word) => NOT_BRAND_WORDS.has(normalizeToken(word)))
    ) {
      return false
    }

    return words.length - count >= 2
  }

  const third = normalizeToken(words[2] ?? "")
  if (PRODUCT_START_WORDS.has(third) && canStrip(2)) {
    return words.slice(2).join(" ")
  }

  if (
    canStrip(1) &&
    !FUNCTION_WORDS.has(normalizeToken(words[1] ?? ""))
  ) {
    return words.slice(1).join(" ")
  }

  return title
}

/**
 * Turns wholesale-style Shopify titles into cleaner storefront display names.
 * Keeps the original title if cleanup would leave nothing useful.
 */
export const formatDisplayTitle = (
  title: string,
  vendor?: string | null
) => {
  const original = title.trim().replace(/\s+/g, " ")

  if (!original) {
    return title
  }

  let result = stripVendorPrefix(original, vendor)
  result = stripPhrases(result, NOISE_PHRASES)

  // Drop trailing parenthetical size notes: "(S-3XL)", "(1XL-3XL)"
  result = result.replace(
    /\s*\((?:size\s*)?[xs0-9]+(?:\s*[-–/]\s*[xl0-9]+)?\)\s*$/i,
    ""
  )

  result = stripInferredBrandPrefix(normalizeTitle(result))
  result = normalizeTitle(result)

  if (result.length > LONG_TITLE_LIMIT) {
    let candidate = result

    for (const phrase of LONG_TITLE_FILLER) {
      if (candidate.length <= LONG_TITLE_LIMIT) {
        break
      }

      const next = normalizeTitle(stripPhrases(candidate, [phrase]))
      if (next.split(/\s+/).length >= 3) {
        candidate = next
      }
    }

    result = candidate
  }

  // Avoid over-shortening into a fragment like "Jeans" from a bad strip
  if (result.length < 3 || result.split(/\s+/).length < 2) {
    return original
  }

  return result
}
