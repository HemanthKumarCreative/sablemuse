"use server"

import { subscribeEmailToShopify } from "./subscribe-email"

export const subscribeEmailAction = async (email: string) =>
  subscribeEmailToShopify(email)
