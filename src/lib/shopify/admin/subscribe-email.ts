import { adminFetch } from "./client"

type CustomerNode = {
  id: string
  defaultEmailAddress?: {
    emailAddress?: string | null
    marketingState?: string | null
  } | null
}

type FindCustomerData = {
  customers: {
    edges: Array<{ node: CustomerNode }>
  }
}

type CreateCustomerData = {
  customerCreate: {
    customer: CustomerNode | null
    userErrors: Array<{ field?: string[] | null; message: string }>
  }
}

type ConsentUpdateData = {
  customerEmailMarketingConsentUpdate: {
    customer: CustomerNode | null
    userErrors: Array<{ field?: string[] | null; message: string }>
  }
}

const FIND_CUSTOMER = `
  query NewsletterCustomer($query: String!) {
    customers(first: 1, query: $query) {
      edges {
        node {
          id
          defaultEmailAddress {
            emailAddress
            marketingState
          }
        }
      }
    }
  }
`

const CREATE_CUSTOMER = `
  mutation NewsletterCustomerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        defaultEmailAddress {
          emailAddress
          marketingState
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const UPDATE_CONSENT = `
  mutation NewsletterConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
    customerEmailMarketingConsentUpdate(input: $input) {
      customer {
        id
        defaultEmailAddress {
          emailAddress
          marketingState
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const emailQuery = (email: string) => `email:"${email.replace(/"/g, "")}"`

const subscribeExistingCustomer = async (customerId: string) => {
  const data = await adminFetch<ConsentUpdateData>({
    query: UPDATE_CONSENT,
    variables: {
      input: {
        customerId,
        emailMarketingConsent: {
          marketingState: "SUBSCRIBED",
          marketingOptInLevel: "SINGLE_OPT_IN",
        },
      },
    },
  })

  const error = data.customerEmailMarketingConsentUpdate.userErrors[0]
  if (error) {
    throw new Error(error.message)
  }
}

export type SubscribeEmailResult =
  | { ok: true; alreadySubscribed?: boolean }
  | { ok: false; error: string }

export const subscribeEmailToShopify = async (
  rawEmail: string
): Promise<SubscribeEmailResult> => {
  const email = rawEmail.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." }
  }

  try {
    const existing = await adminFetch<FindCustomerData>({
      query: FIND_CUSTOMER,
      variables: { query: emailQuery(email) },
    })
    const customer = existing.customers.edges[0]?.node

    if (customer) {
      if (customer.defaultEmailAddress?.marketingState === "SUBSCRIBED") {
        return { ok: true, alreadySubscribed: true }
      }

      await subscribeExistingCustomer(customer.id)
      return { ok: true }
    }

    const created = await adminFetch<CreateCustomerData>({
      query: CREATE_CUSTOMER,
      variables: {
        input: {
          email,
          emailMarketingConsent: {
            marketingState: "SUBSCRIBED",
            marketingOptInLevel: "SINGLE_OPT_IN",
          },
          tags: ["newsletter", "footer-signup"],
        },
      },
    })

    const createError = created.customerCreate.userErrors[0]
    if (createError) {
      const message = createError.message.toLowerCase()
      if (message.includes("already been taken") || message.includes("has already been taken")) {
        const retry = await adminFetch<FindCustomerData>({
          query: FIND_CUSTOMER,
          variables: { query: emailQuery(email) },
        })
        const retryCustomer = retry.customers.edges[0]?.node
        if (!retryCustomer) {
          return { ok: false, error: createError.message }
        }
        if (retryCustomer.defaultEmailAddress?.marketingState === "SUBSCRIBED") {
          return { ok: true, alreadySubscribed: true }
        }
        await subscribeExistingCustomer(retryCustomer.id)
        return { ok: true }
      }

      return { ok: false, error: createError.message }
    }

    if (!created.customerCreate.customer) {
      return { ok: false, error: "We could not save that email. Please try again." }
    }

    return { ok: true }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "We could not save that email."
    if (message.includes("Admin is not configured")) {
      return {
        ok: false,
        error: "Email signup is unavailable right now. Please email support@sablemuse.shop.",
      }
    }
    if (
      message.toLowerCase().includes("access denied") ||
      message.toLowerCase().includes("access_denied")
    ) {
      return {
        ok: false,
        error:
          "Email signup needs Admin API scopes read_customers and write_customers.",
      }
    }
    return { ok: false, error: message }
  }
}
