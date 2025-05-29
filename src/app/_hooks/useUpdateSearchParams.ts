import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useCustomQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(key, value);

    if (key === "search") {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return { setQuery };
}
