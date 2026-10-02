import { readFileSync } from "fs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const index = line.indexOf("=")
      const key = line.slice(0, index).trim()
      let value = line.slice(index + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      return [key, value]
    })
)

const domain = env.SHOPIFY_STORE_DOMAIN
const token = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const version = env.SHOPIFY_STOREFRONT_API_VERSION || "2025-10"

if (!domain || !token) {
  console.log(JSON.stringify({ configured: false }))
  process.exit(0)
}

const query = `query {
  products(first: 20) {
    edges { node {
      handle
      images(first: 20) { edges { node { url } } }
      priceRange { minVariantPrice { amount } maxVariantPrice { amount } }
      variants(first: 5) { edges { node { title price { amount } availableForSale } } }
    } }
  }
  product(handle: "judy-blue-full-size-high-waist-washed-denim-shorts") {
    description
  }
}`

const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": token,
  },
  body: JSON.stringify({ query }),
})

const body = await res.json()

if (body.errors && !body.data) {
  console.log(
    JSON.stringify(
      { http: res.status, errors: body.errors.map((error) => error.message) },
      null,
      2
    )
  )
  process.exit(0)
}

const nodes = body.data.products.edges.map((edge) => edge.node)
const description = body.data.product?.description ?? ""

const summary = {
  priceSpread: nodes
    .filter(
      (product) =>
        product.priceRange.minVariantPrice.amount !==
        product.priceRange.maxVariantPrice.amount
    )
    .map((product) => ({
      handle: product.handle,
      min: product.priceRange.minVariantPrice.amount,
      max: product.priceRange.maxVariantPrice.amount,
    })),
  imagesOver12: nodes
    .filter((product) => product.images.edges.length > 12)
    .map((product) => ({
      handle: product.handle,
      images: product.images.edges.length,
    })),
  fractionalPrices: nodes
    .filter((product) => !product.priceRange.minVariantPrice.amount.endsWith(".00") && !product.priceRange.minVariantPrice.amount.endsWith(".0"))
    .map((product) => ({
      handle: product.handle,
      price: product.priceRange.minVariantPrice.amount,
    })),
  descriptionHasInch: /inch|\"|cm|lbs|oz/i.test(description),
  descriptionExcerpt: description.slice(0, 280),
}

console.log(JSON.stringify(summary, null, 2))
