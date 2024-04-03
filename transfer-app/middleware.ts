import { NextRequest, NextResponse } from "next/server";

const serviceToken = process.env.PANGEA_TOKEN;
const domain = "aws.us.pangea.cloud";

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }
  const token = req.headers.get("Authorization");
  if (!token) {
    return new NextResponse(null, { status: 403 });
  }
  const resp = await fetch(`https://authn.${domain}/v2/client/token/check`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceToken}`,
    },
    body: JSON.stringify({
      token,
    }),
  });
  if (resp.status !== 200) {
    return new NextResponse(null, { status: 403 });
  }
  return NextResponse.next();
}