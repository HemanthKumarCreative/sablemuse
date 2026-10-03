export const MONEY_FRAGMENT = `
  fragment MoneyFields on MoneyV2 {
    amount
    currencyCode
  }
`

export const IMAGE_FRAGMENT = `
  fragment ImageFields on Image {
    url
    altText
    width
    height
  }
`

export const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCardFields on Product {
    id
    title
    handle
    vendor
    description
    tags
    availableForSale
    featuredImage {
      ...ImageFields
    }
    priceRange {
      minVariantPrice {
        ...MoneyFields
      }
      maxVariantPrice {
        ...MoneyFields
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyFields
      }
    }
    options {
      name
      values
    }
    images(first: 2) {
      edges {
        node {
          ...ImageFields
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            ...MoneyFields
          }
          compareAtPrice {
            ...MoneyFields
          }
          image {
            ...ImageFields
          }
        }
      }
    }
  }
`

export const PRODUCT_DETAIL_FRAGMENT = `
  fragment ProductDetailFields on Product {
    id
    title
    handle
    vendor
    description
    tags
    availableForSale
    productType
    options {
      name
      values
    }
    featuredImage {
      ...ImageFields
    }
    images(first: 2) {
      edges {
        node {
          ...ImageFields
        }
      }
    }
    media(first: 50) {
      edges {
        node {
          mediaContentType
          alt
          ... on MediaImage {
            image {
              ...ImageFields
            }
          }
          ... on Video {
            sources {
              url
              mimeType
            }
            previewImage {
              ...ImageFields
            }
          }
          ... on ExternalVideo {
            embedUrl
            previewImage {
              ...ImageFields
            }
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyFields
      }
      maxVariantPrice {
        ...MoneyFields
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyFields
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          sku
          selectedOptions {
            name
            value
          }
          price {
            ...MoneyFields
          }
          compareAtPrice {
            ...MoneyFields
          }
          image {
            ...ImageFields
          }
        }
      }
    }
  }
`
