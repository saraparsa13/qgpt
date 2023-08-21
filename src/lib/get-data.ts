import { API_KEY } from "src/config";

export async function fetcher(url, { arg }: { arg: string }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(arg),
  });

  const result = await response.json();
  return result;
}