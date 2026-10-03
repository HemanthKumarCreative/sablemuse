const WORD = /[a-z]{2,}/i

export const readableAlt = (alt?: string | null) => {
  const value = alt?.replace(/\s+/g, " ").trim() ?? ""
  if (!value) {
    return ""
  }

  if (/-max$/i.test(value) && !/\s/.test(value)) {
    return ""
  }

  const compact = value.replace(/[\s-]/g, "")
  if (/^[0-9a-f]{16,}$/i.test(compact)) {
    return ""
  }

  const words = value.split(" ").filter((word) => WORD.test(word))
  if (words.length === 0) {
    return ""
  }

  return value
}
