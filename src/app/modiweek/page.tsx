import { redirect } from "next/navigation"
import { MODIWEEK_DEFAULT_SLUG } from "@/data/modiweek"

const ModiweekIndexPage = () => {
  redirect(`/modiweek/${MODIWEEK_DEFAULT_SLUG}`)
}

export default ModiweekIndexPage
