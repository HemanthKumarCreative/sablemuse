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
    descriptionHtml
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
    media(first: 50, after: $mediaAfter) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
          ... on Model3d {
            sources {
              url
              mimeType
            }
            previewImage {
              ...ImageFields
            }
          }
        }
      }
    }
    collections(first: 20) {
      edges {
        node {
          handle
          title
        }
      }
    }
    metafields(identifiers: [
      {namespace: "custom", key: "stretch"},
      {namespace: "custom", key: "sheer"},
      {namespace: "custom", key: "opacity"},
      {namespace: "custom", key: "lining"},
      {namespace: "custom", key: "fit"},
      {namespace: "custom", key: "material"}
    ]) {
      key
      value
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
    variants(first: 100, after: $variantAfter) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
