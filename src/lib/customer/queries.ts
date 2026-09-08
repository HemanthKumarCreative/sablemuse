import { getCustomerSession } from "./session"

type CustomerProfile = {
  id: string
  firstName?: string | null
  lastName?: string | null
  emailAddress?: { emailAddress?: string | null } | null
}

export const fetchCustomerProfile = async (): Promise<CustomerProfile | null> => {
  const session = await getCustomerSession()
  if (!session) {
    return null
  }

  const shopId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID
  if (!shopId) {
    return null
  }

  try {
    const response = await fetch(
      `https://shopify.com/${shopId}/account/customer/api/2025-10/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: session.accessToken,
        },
        body: JSON.stringify({
          query: `
            query CustomerProfile {
              customer {
                id
                firstName
                lastName
                emailAddress {
                  emailAddress
                }
              }
            }
          `,
        }),
        cache: "no-store",
      }
    )

    if (!response.ok) {
      return null
    }

    const body = (await response.json()) as {
      data?: { customer?: CustomerProfile | null }
    }

    return body.data?.customer ?? null
  } catch (error) {
    console.error("Failed to fetch customer profile", error)
    return null
  }
}
