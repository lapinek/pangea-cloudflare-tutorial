import type { NextRequest } from "next/server";

const serviceToken = process.env.PANGEA_TOKEN;
const domain = "aws.us.pangea.cloud";
const activityServiceConfig = "pci_4znglgymz43lykqek2zjjwlikce6ln6w";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const body: any = await request.json();
  // We'll be using the same endpoint to route all of the component's calls
  // In this case, we use the v1/results endpoint when the page changes.
  // In bettertransfer we used query params, which is also possible.
  const path = "id" in body ? "results" : "search";
  const resp = await fetch(`https://audit.${domain}/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceToken}`,
    },
    body: JSON.stringify({
      config_id: activityServiceConfig,
      // Optionally add the id to the payload if it's present
      ...(body.id && { id: body.id }),
    }),
  });

  // Internal error, this should work unless something is misconfigured
  if (resp.status !== 200) {
    const text = await resp.text();
    throw new Error(text);
  }

  const data: { result: any } = await resp.json();
  return new Response(JSON.stringify(data.result));
}
