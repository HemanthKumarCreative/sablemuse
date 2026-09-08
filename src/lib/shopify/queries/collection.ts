export const getAllCollectionsQuery = /* GraphQL */ `
  query GetAllCollections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
        }
      }
    }
  }
`

export const getProductsByCollectionQuery = /* GraphQL */ `
  query GetProductsByCollection($handle: String!, $cursor: String) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: 24, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            handle
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
            images(first: 6) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
