import type { ProductSizeChart, ProductSpec } from "@/types/commerce"

export type ParsedDescription = {
  prose: string[]
  specs: ProductSpec[]
  fabricCare: string
  modelInfo: string
  sizeChart?: ProductSizeChart
}

const decode = (value: string) => {
  const text = value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))

  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/:([^\s])/g, ": $1")
    .replace(/\s+/g, " ")
    .trim()
}

const stripUnsafe = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<img\b[^>]*>/gi, "")

const splitLabel = (text: string) => {
  const match = text.match(/^([^:]{2,60}):\s*(.*)$/)
  if (!match) {
    return null
  }

  return {
    label: match[1].trim(),
    value: match[2].trim(),
  }
}

const parseTable = (tableHtml: string): ProductSizeChart | undefined => {
  const rows = [...tableHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((row) =>
      [...row[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) =>
        decode(cell[1])
      )
    )
    .filter((row) => row.some(Boolean))

  if (rows.length < 2) {
    return undefined
  }

  return {
    headers: rows[0],
    rows: rows.slice(1),
  }
}

const isModelParagraph = (paragraph: string) =>
  /\bmodel\b/i.test(paragraph) ||
  (/\bheight\b/i.test(paragraph) && /\b(bust|waist|hip)\b/i.test(paragraph))

export const parseDescription = (html: string): ParsedDescription => {
  const clean = stripUnsafe(html)
  const tableMatch = clean.match(/<table\b[\s\S]*?<\/table>/i)
  const sizeChart = tableMatch ? parseTable(tableMatch[0]) : undefined
  const prose: string[] = []
  const specs: ProductSpec[] = []
  const modelLines: string[] = []
  let fabricCare = ""

  const listItems = [...clean.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map(
    (match) => decode(match[1])
  )
  const paragraphs = [...clean.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => decode(match[1]))
    .filter(Boolean)

  for (const item of listItems) {
    if (!item) {
      continue
    }

    if (/^imported$/i.test(item)) {
      specs.push({ label: "Origin", value: "Imported" })
      continue
    }

    const pair = splitLabel(item)
    if (!pair) {
      continue
    }

    if (/^care instructions$/i.test(pair.label)) {
      fabricCare = pair.value
      continue
    }

    if (/^model information$/i.test(pair.label)) {
      if (pair.value) {
        modelLines.push(pair.value)
      }
      continue
    }

    if (!pair.value || /^product measurements/i.test(pair.label)) {
      continue
    }

    specs.push({ label: pair.label, value: pair.value })
  }

  for (const paragraph of paragraphs) {
    if (/^product measurements/i.test(paragraph)) {
      continue
    }

    if (isModelParagraph(paragraph)) {
      modelLines.push(paragraph)
      continue
    }

    prose.push(paragraph)
  }

  return {
    prose,
    specs,
    fabricCare,
    modelInfo: modelLines.join("\n"),
    sizeChart,
  }
}

export const productMetaDescription = (
  prose: string[],
  fallback: string,
  specs: Array<{ label: string; value: string }> = []
) => {
  const feature = specs.find((spec) => /features|material/i.test(spec.label))
  const longProse = prose.find((paragraph) => paragraph.length > 40)
  const source =
    longProse ??
    (feature ? `${fallback}. ${feature.value}` : prose[0] ?? fallback)
  const sentence = longProse
    ? (longProse.split(/(?<=[.!?])\s/)[0] ?? longProse)
    : source
  const trimmed = sentence.replace(/\s+/g, " ").trim()

  if (trimmed.length <= 160) {
    return trimmed
  }

  return `${trimmed.slice(0, 157).trimEnd()}...`
}
