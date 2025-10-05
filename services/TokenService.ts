let cachedToken : string | null = null
let tokenExpiry : number = 0

export async function getToken(): Promise<string> {
  const now = Date.now()
  if(cachedToken && now < tokenExpiry) return cachedToken
  try {
    const baseUrl = typeof window !== "undefined"
    ? window.location.origin
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/token`)
    if(!res.ok) throw new Error("Failed to fetch token")
    const { token } = await res.json()
    cachedToken = token
    tokenExpiry = now+9.6*60*1000
    return token
  } catch (err) {
    console.error("getToken error:", err)
    throw err
  }
}