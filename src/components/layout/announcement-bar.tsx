import Link from "next/link"

export const AnnouncementBar = () => {
  return (
    <div
      className="bg-ink px-4 py-1.5 text-center text-xs font-semibold tracking-eyebrow text-background sm:text-sm"
      role="status"
    >
      <Link
        href="/shipping"
        className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Free Shipping On Orders Within The United States
      </Link>
    </div>
  )
}
