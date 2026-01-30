import { redirect, notFound } from "next/navigation";

async function resolveShortUrl(code: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${code}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function RedirectPage(props: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await props.params;

  const data = await resolveShortUrl(code);

  if (!data || !data.original_url) {
    notFound();
  }

  redirect(data.original_url);
}
