import { getToken } from "./TokenService"

export const fetcher = async (url: string) => {
  const token = await getToken()
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if(!res.ok) throw new Error("Fetch error")
  return res.json()
}