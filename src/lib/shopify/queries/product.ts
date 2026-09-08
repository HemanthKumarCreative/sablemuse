import { shopifyFetch } from "../index";
import type { Product } from "@/data/home";
import type { ProductDetail } from "@/data/products";

export async function getProducts(limit: number = 10): Promise<Product[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({
      query,
      variables: {
        first: limit,
      },
    });

    const shopifyProducts = response.body.data.products.edges.map((edge: any) => edge.node);

    // Map Shopify product structure to the UI Product structure
    const mappedProducts: Product[] = shopifyProducts.map((p: any) => ({
      id: p.handle, // Use handle as id for routing to /product/[handle]
      name: p.title,
      subtitle: "New Arrival", // Defaulting subtitle
      price: parseFloat(p.priceRange.maxVariantPrice.amount),
      image: p.images?.edges?.[0]?.node?.url || "/images/placeholder.jpg",
      colors: [], // Colors would ideally come from product options/metafields
      isNew: true,
      isBestSeller: true, // Assuming these are fetched for best sellers
    }));

    return mappedProducts;
  } catch (error) {
    console.error("Failed to fetch products from Shopify", error);
    return []; // Return empty array on failure so UI doesn't crash completely
  }
}

export async function getProduct(handle: string): Promise<ProductDetail | null> {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({
      query,
      variables: {
        handle,
      },
    });

    const shopifyProduct = response.body.data.product;

    if (!shopifyProduct) {
      return null;
    }

    const images = shopifyProduct.images?.edges?.map((edge: any) => edge.node.url) || [];

    const mappedProduct: ProductDetail = {
      id: shopifyProduct.handle,
      name: shopifyProduct.title,
      subtitle: "New Arrival",
      price: parseFloat(shopifyProduct.priceRange.maxVariantPrice.amount),
      image: images[0] || "/images/placeholder.jpg",
      colors: [{ name: "Default", hex: "#0C0C0C" }],
      category: "Shop",
      categoryHref: "/shop-all",
      description: shopifyProduct.description || "No description available.",
      gallery: images.length > 0 ? images : ["/images/placeholder.jpg"],
      sizes: ["S", "M", "L"], // Mocking sizes for now
      fitting: "We recommend taking your usual size.",
      fabricCare: "Machine wash cold. Do not tumble dry.",
      productDetail: shopifyProduct.description || "Detailed product information.",
      shippingReturns: "Free shipping on orders over $150. Returns accepted within 30 days.",
      sizeSelector: "select",
      ctaStyle: "brand",
    };

    return mappedProduct;
  } catch (error) {
    console.error("Failed to fetch single product from Shopify", error);
    return null;
  }
}
