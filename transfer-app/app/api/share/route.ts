import type { NextRequest } from "next/server";

const serviceToken = process.env.PANGEA_TOKEN;
const domain = "aws.us.pangea.cloud";
const shareVersion = "v1beta";

export const runtime = "edge";

// We've added this type declaration since the template uses the
// `@cloudflare/workers-types/2023-07-01` typeset which did not include duplex
// in the RequestInit interface used by fetch.
declare global {
  // This extends the existing RequestInit type, cloudflare
  interface RequestInit {
    duplex?: "half" | "full";
  }
}

export async function POST(request: NextRequest) {
  // We pass the path using query params to avoid any path funny business
  // using edge functions
  const path = request.nextUrl.searchParams.get("path");
  const url = `https://share.${domain}/${shareVersion}/${path}`;
  const contentType = request.headers.get("Content-Type") || "application/json";
  const headers = {
    Authorization: `Bearer ${serviceToken}`,
  };

  if (contentType.startsWith("multipart/form-data")) {
    // FormData is a bit finicky
    const formData = await request.formData();
    const resp = await fetch(url, {
      method: "POST",
      body: formData,
      headers,
    });
    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
    });
  }
  const resp = await fetch(url, {
    method: "POST",
    headers,
    body: request.body,
    duplex: "half",
  });
  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
  });
}
