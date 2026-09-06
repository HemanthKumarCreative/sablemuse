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
      "Our Modimal Customer Service Team is available Monday through Friday, 9 am – 5 pm ET, excluding holidays. You can reach us via email at hello@modimal.com for general inquiries, live chat in the bottom right corner of the website, or voicemail at +1 (800) 868-3368. We will make sure to get back to you within 24 business hours.",
  },
  {
    id: "ship-when",
    question: "When Will My Order Ship?",
    answer:
      "Orders typically ship within 1–2 business days. Once your package is on its way, you’ll receive a confirmation email with tracking details so you can follow its progress.",
  },
  {
    id: "cancel",
    question: "Can I Cancel Or Modify My Order?",
    answer:
      "If your order hasn’t shipped yet, contact us as soon as possible at hello@modimal.com with your order number. We’ll do our best to cancel or update it before it leaves our warehouse.",
  },
  {
    id: "shipping-options",
    question: "What Are My Shipping Options?",
    answer:
      "We offer standard and express shipping at checkout. Shipping is free on qualifying US orders, and Canada rates are shown during checkout based on your delivery address.",
  },
  {
    id: "payment",
    question: "What Type Of Payment Methods Do You Offer?",
    answer:
      "We accept major credit and debit cards including Visa, Mastercard, and American Express, as well as PayPal. All payments are processed securely at checkout.",
  },
  {
    id: "size",
    question: "Which Size Will Fit Me Best?",
    answer:
      "We offer product and body measurements for each of our styles. Click Size Guide on a product page to find your best fit — measuring guides are included.",
  },
  {
    id: "care",
    question: "How Do I Take Care Of My Modimal Pieces?",
    answer:
      "Most pieces prefer cold machine wash and line dry. Avoid bleach, fabric softener, and high heat. Check each product’s Fabric & Care details for fiber-specific guidance.",
  },
  {
    id: "manufacture",
    question: "Where And How Do You Manufacture Your Products?",
    answer:
      "We work with carefully selected partners who share our standards for quality and responsibility. Manufacturing locations and processes vary by style and are chosen for craft, durability, and lower impact.",
  },
  {
    id: "suppliers",
    question: "How Do You Find And Evaluate Your Suppliers?",
    answer:
      "We evaluate suppliers on quality, transparency, working conditions, and environmental practices. Ongoing partnerships focus on continuous improvement — not one-time audits alone.",
  },
  {
    id: "workers",
    question: "How Do Your Suppliers Support Their Workers?",
    answer:
      "We prioritize partners who provide fair wages, safe workplaces, and respectful treatment. When concerns arise, we work with suppliers to address them and improve conditions over time.",
  },
]
