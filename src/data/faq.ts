export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "contact",
    question: "How Do I Contact Your Customer Service?",
    answer:
      "Sable Muse customer care is available Monday through Friday, 9 am to 5 pm Eastern Time, excluding holidays. Email support@sablemuse.shop and we will reply within one business day.",
  },
  {
    id: "ship-when",
    question: "When Will My Order Ship?",
    answer:
      "Orders typically ship within 1–2 business days to addresses in the United States. Once your package is on its way, you will receive an email with tracking details.",
  },
  {
    id: "cancel",
    question: "Can I Cancel Or Modify My Order?",
    answer:
      "If your order has not shipped yet, email support@sablemuse.shop with your order number as soon as you can. We will try to cancel or update it before it leaves.",
  },
  {
    id: "shipping-options",
    question: "What Are My Shipping Options?",
    answer:
      "We ship within the United States. Prices are shown in US dollars, and shipping is free on US orders. The delivery choice is confirmed at checkout.",
  },
  {
    id: "payment",
    question: "What Type Of Payment Methods Do You Offer?",
    answer:
      "Checkout is completed on Shopify’s secure payment page. Available methods are shown there and can include major credit and debit cards. Sable Muse does not store your card number.",
  },
  {
    id: "size",
    question: "Which Size Will Fit Me Best?",
    answer:
      "Use the size options on the product page and compare them with a piece you already own. Open the Size Guide on the product when it is available, and email support@sablemuse.shop if you want help before you order.",
  },
  {
    id: "care",
    question: "How Do I Take Care Of My Sable Muse Pieces?",
    answer:
      "Most pieces do best with a cold machine wash and line dry. Skip bleach, fabric softener, and high heat unless the product page says otherwise.",
  },
  {
    id: "currency",
    question: "Which Currency Do You Use?",
    answer:
      "Sable Muse prices and checkout totals are in US dollars. The shop is set up for customers in the United States.",
  },
  {
    id: "returns",
    question: "Can I Return An Order?",
    answer:
      "Returns are accepted within 7 days of delivery for unworn items in their original condition. Email support@sablemuse.shop with your order number to start a return.",
  },
]
