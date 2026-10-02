# Shopify setup notes

The live client, queries, and cart actions are in `src/lib/shopify`. Customer login is in `src/lib/customer` and `src/app/api/auth`. Environment names below match `.env.example`. The walkthrough after the code layout is the original store-setup guide. Do not add a second client at `lib/shopify.ts`.

# Integrating Headless Shopify with Next.js

This project uses the Storefront API + Customer Account API. Copy `.env.example` to `.env.local` and fill in credentials from the Headless sales channel.

## Code layout

```
src/lib/shopify/     # Storefront client, queries, mutations, cart actions
src/lib/customer/    # Customer Account OAuth + session
src/types/commerce.ts
src/app/api/auth/    # login, callback, logout
```

Collection handles for routes live in `src/lib/shopify/collections.ts` — update them to match collections published to your Headless channel.

## Environment

```env
SHOPIFY_STORE_DOMAIN="your-store-name.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your_public_access_token_here"
SHOPIFY_STOREFRONT_API_VERSION="2025-10"
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=""
SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID=""
SHOPIFY_CUSTOMER_ACCOUNT_CALLBACK_URL="http://localhost:3000/api/auth/callback"
CUSTOMER_SESSION_SECRET="replace-with-a-long-random-secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## Checkout

Contact and shipping steps update the Storefront cart. Payment redirects to Shopify Checkout via `cart.checkoutUrl` (card data is never collected in this app).

## Original beginner walkthrough

The steps below remain useful for creating a development store and Headless channel credentials.

### Step 1: Set Up Your Shopify Development Store

If you don't already have a Shopify store, the best place to start is by creating a development store.

1. Go to the [Shopify Partners](https://partners.shopify.com/) page and sign up for a free account.
2. Once logged in to the Partner Dashboard, click on **Stores** in the left sidebar.
3. Click the **Add store** button and select **Create development store**.
4. Choose **Create a store to test and build**.
5. Give your store a name (this will determine your `.myshopify.com` domain).
6. Under "Start with test data", you can choose to include some standard test products, which is very helpful for building the UI.
7. Click **Create development store**.

## Step 2: Install the Headless App and Get API Credentials

To let your Next.js app talk to Shopify, we need to use the **Storefront API**. Shopify provides an app specifically for managing headless connections.

1. From your Shopify Admin panel, go to **Settings** (bottom left corner).
2. Click on **Apps and sales channels** in the left menu.
3. Click on the **Develop apps** button (or search for "Headless" in the Shopify App Store and install it). 
   *Alternatively, if using the official Headless channel:*
   - Go to Sales Channels > Headless. If it's not there, add it from the Shopify App Store.
   - Once the Headless app is installed, open it.
4. Click **Create storefront**.
5. Give your storefront a name (e.g., "Next.js Frontend").
6. Click **Create**.
7. Once created, you will be taken to a page with your API credentials. You need two pieces of information from this page:
   - **Store domain**: Looks like `your-store-name.myshopify.com`
   - **Public access token** (Storefront API Access Token): A long string of characters used to authenticate your frontend requests.

> [!IMPORTANT]
> The Storefront API token is safe to be exposed in your frontend (it only has "read" access to public data like products and collections). However, **never** expose your Shopify Admin API tokens.

## Step 3: Configure Environment Variables in Next.js

Now we need to store these credentials securely in our Next.js project.

1. In the root directory of your Next.js project, create a new file named `.env.local` (if it doesn't exist already).
2. Add the following lines to the file, replacing the placeholder values with the credentials you copied in Step 2:

```env
SHOPIFY_STORE_DOMAIN="your-store-name.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your_public_access_token_here"
```

## Step 4: Create a GraphQL Fetch Utility

Shopify's Storefront API uses GraphQL. We will create a helper function to send GraphQL queries to Shopify. Next.js has native support for `fetch` which works perfectly for this.

1. Create a new folder named `lib` in your project root (if it doesn't exist).
2. Inside `lib`, create a file named `shopify.ts`.
3. Add the following code:

```typescript
// lib/shopify.ts

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: any;
}): Promise<{ status: number; body: T } | never> {
  const endpoint = `https://${domain}/api/2024-04/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw {
      status: 500,
      message: 'Error receiving data',
      error,
    };
  }
}
```

## Step 5: Write a GraphQL Query

Let's write a query to fetch the latest products.

1. You can write your queries in the same file or a separate one. Let's add this query function to `lib/shopify.ts` below the fetch function:

```typescript
// Add this to the bottom of lib/shopify.ts

export async function getProducts() {
  const query = `
    query getProducts {
      products(first: 10) {
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

  const response = await shopifyFetch<any>({ query });
  
  // Format the data to make it easier to use in your components
  return response.body.data.products.edges.map((edge: any) => edge.node);
}
```

## Step 6: Use the Data in Your Next.js Components

Now you can call this function from your React Server Components to render the data.

1. Open your main page, e.g., `app/page.tsx` (or whatever page displays products).
2. Update the file to fetch and map over the products:

```tsx
import { getProducts } from '@/lib/shopify';
import Image from 'next/image';

export default async function Home() {
  // Fetch real data from Shopify
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Latest Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              {product.images.edges[0] && (
                <Image
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText || product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  width={500}
                  height={500}
                />
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={`/product/${product.handle}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </a>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ${product.priceRange.maxVariantPrice.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
```

## Next Steps

Congratulations! You have successfully connected your Next.js application to your Shopify store. 

From here, you will want to:
- Add a specific Product Details Page (`app/product/[handle]/page.tsx`).
- Implement the Cart functionality (using Shopify's Cart API).
- Handle Checkout (usually redirecting to Shopify's secure hosted checkout).

Shopify's [Storefront API Documentation](https://shopify.dev/docs/api/storefront) is your best friend for finding the right queries for Collections, Cart, and more.
