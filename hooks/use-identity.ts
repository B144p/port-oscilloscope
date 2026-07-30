import { useQuery } from "@tanstack/react-query";
import { aboutMeQuery } from "@/lib/queries";
import { IDENTITY_FALLBACK } from "@/lib/site-config";

/**
 * Resolves the hero handle/role from GET /v1/about-me, falling back to
 * IDENTITY_FALLBACK while pending or when the API field is null.
 */
export function useIdentity(): {
  handle: string;
  role: string;
  isPending: boolean;
} {
  const { data, isPending } = useQuery(aboutMeQuery);
  return {
    handle: data?.handle ?? IDENTITY_FALLBACK.handle,
    role: data?.role ?? IDENTITY_FALLBACK.role,
    isPending,
  };
}
