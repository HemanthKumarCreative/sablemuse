import type { ProductDetail, ProductOption, ProductVariant } from "@/types/commerce"
import { isColorOption, isSizeOption } from "@/lib/shopify/mappers/color"

const isDefaultTitlePair = (name: string, value: string) =>
  name.trim().toLowerCase() === "title" && value.trim().toLowerCase() === "default title"

export const isDefaultTitleOption = (option: ProductOption) => {
  if (option.name.trim().toLowerCase() !== "title" || option.values.length !== 1) {
    return false
  }

  return option.values[0]?.trim().toLowerCase() === "default title"
}

export const selectableOptions = (product: ProductDetail) =>
  (product.options ?? []).filter((option) => !isDefaultTitleOption(option))

export const initialSelection = (product: ProductDetail) => {
  const selected: Record<string, string> = {}

  for (const option of selectableOptions(product)) {
    if (isColorOption(option.name) && option.values[0]) {
      selected[option.name] = option.values[0]
    }
  }

  return selected
}

export const variantMatchesSelection = (
  variant: ProductVariant,
  selected: Record<string, string>
) =>
  variant.selectedOptions.every((option) => {
    if (isDefaultTitlePair(option.name, option.value)) {
      return true
    }

    const chosen = selected[option.name]
    if (!chosen) {
      return true
    }

    return chosen === option.value
  })

export const matchingVariants = (
  product: ProductDetail,
  selected: Record<string, string>
) => (product.variants ?? []).filter((variant) => variantMatchesSelection(variant, selected))

export const isSelectionComplete = (
  product: ProductDetail,
  selected: Record<string, string>
) => selectableOptions(product).every((option) => Boolean(selected[option.name]))

export const exactVariant = (
  product: ProductDetail,
  selected: Record<string, string>
) => {
  if (!isSelectionComplete(product, selected)) {
    return undefined
  }

  const matches = matchingVariants(product, selected)
  if (matches.length === 1) {
    return matches[0]
  }

  return matches.find((variant) => variant.availableForSale) ?? matches[0]
}

export const isValuePurchasable = (
  product: ProductDetail,
  selected: Record<string, string>,
  optionName: string,
  value: string
) =>
  (product.variants ?? []).some((variant) => {
    if (!variant.availableForSale) {
      return false
    }

    return variant.selectedOptions.every((option) => {
      if (option.name === optionName) {
        return option.value === value
      }

      if (isDefaultTitlePair(option.name, option.value)) {
        return true
      }

      const chosen = selected[option.name]
      if (!chosen) {
        return true
      }

      return chosen === option.value
    })
  })

export const selectedColorName = (
  product: ProductDetail,
  selected: Record<string, string>
) => {
  const color = selectableOptions(product).find((option) => isColorOption(option.name))
  if (!color) {
    return ""
  }

  return selected[color.name] ?? ""
}

export const selectedImageUrl = (
  product: ProductDetail,
  selected: Record<string, string>
) => {
  const matches = matchingVariants(product, selected).filter((variant) => variant.image)
  const available = matches.find((variant) => variant.availableForSale)
  return (available ?? matches[0])?.image
}

export const firstMissingOption = (
  product: ProductDetail,
  selected: Record<string, string>
) =>
  selectableOptions(product).find(
    (option) => !selected[option.name] && !isColorOption(option.name)
  )

export const selectionPrompt = (option: ProductOption) =>
  isSizeOption(option.name)
    ? "Please select a size"
    : `Please select ${option.name.toLowerCase()}`
