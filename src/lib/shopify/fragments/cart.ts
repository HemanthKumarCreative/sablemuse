export const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
              product {
                handle
                title
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
    deliveryGroups(first: 10) {
      edges {
        node {
          id
          deliveryOptions {
            handle
            title
            description
            estimatedCost {
              amount
              currencyCode
            }
          }
          selectedDeliveryOption {
            handle
          }
        }
      }
    }
  }
`
