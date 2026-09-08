import { createHash, randomBytes } from "crypto"

export const generateCodeVerifier = () =>
  randomBytes(32).toString("base64url")

export const generateCodeChallenge = (verifier: string) =>
  createHash("sha256").update(verifier).digest("base64url")

export const generateState = () => randomBytes(16).toString("hex")

export const generateNonce = () => randomBytes(16).toString("hex")
