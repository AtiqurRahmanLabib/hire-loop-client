import type { UserRecord } from "@/types/user"
import { auth } from "../auth"
import { headers } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getPremiumUserById = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`)
  return res.json()
}

/** Used to resolve applicant ids to names/emails in recruiter views. */
export const getUsers = async (): Promise<UserRecord[]> => {
  const res = await fetch(`${BASE_URL}/users`)
  if (!res.ok) return []
  return res.json()
}

export const getUserByAdmin = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "name", // The field to sort by.
      sortDirection: "desc", // The direction to sort by.
    },
    headers: await headers(),
  })
  return users
}
