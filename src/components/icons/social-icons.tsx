import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

export const InstagramIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export const FacebookIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
    </svg>
  )
}

export const PinterestIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.2-.1-.8-.2-2 0-2.9.2-.8 1.3-5.4 1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.5.7 2 .1.1.1.2.1.3l-.3 1.1c0 .2-.1.2-.3.1-1.2-.5-1.8-1.9-1.8-3.4 0-2.5 2.1-5.6 6.3-5.6 3.4 0 5.6 2.4 5.6 5.1 0 3.5-1.9 6.1-4.8 6.1-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.8-.8 1.8-1.2 2.4 1 .3 2 .5 3.1.5 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  )
}

export const TwitterIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 7.2c.6-.4 1.1-.9 1.4-1.5-.6.3-1.2.5-1.9.6.7-.4 1.2-1.1 1.4-1.9-.6.4-1.4.7-2.1.8C18.2 4.5 17.2 4 16.1 4c-2.1 0-3.7 1.9-3.2 3.9-2.7-.1-5.1-1.4-6.7-3.4-.9 1.5-.4 3.5 1 4.5-.5 0-1-.2-1.4-.4 0 1.6 1.1 3 2.6 3.3-.5.1-1 .2-1.5.1.4 1.3 1.7 2.3 3.2 2.3-1.4 1.1-3.2 1.6-5 1.4 1.5 1 3.3 1.5 5.2 1.5 6.3 0 9.8-5.4 9.6-10.2.7-.5 1.2-1 1.7-1.7z" />
    </svg>
  )
}
