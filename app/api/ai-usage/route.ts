import { proxyGet } from "@/lib/backend";

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Forwards only well-formed from/to; anything else never reaches port-server. */
export async function GET(request: Request) {
  const incoming = new URL(request.url).searchParams;
  const forwarded = new URLSearchParams();
  for (const name of ["from", "to"]) {
    const value = incoming.get(name);
    if (value && DAY.test(value)) forwarded.set(name, value);
  }
  const qs = forwarded.toString();
  return proxyGet(request, `/v1/ai-usage${qs ? `?${qs}` : ""}`);
}
