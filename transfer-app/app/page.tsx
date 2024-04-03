
"use client";

import Protected from "./Protected";
import { AuditLogViewer } from "@pangeacyber/react-mui-audit-log-viewer";
import { useAuth } from "@pangeacyber/react-auth";
import { BrandingThemeProvider } from "@pangeacyber/react-mui-branding";
import { Button, Container } from "@mui/material";

export default function Home() {
  return (
    <Protected>
      <main>
        <AuditView />
      </main>
    </Protected>
  );
}

const AuditView: React.FC = () => {
  const { getToken, logout } = useAuth();
  const token = getToken();
  const proxy = async(body: any): Promise<any> => {
    const resp = await fetch("/api/audit", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: token!!,
      },
    });
    return resp.json();
  }

  return (
    <BrandingThemeProvider
      brandingId="pro_icmwkw37wnszg7k7jv3del73ykbamjkf"
      auth={{
        clientToken: "pcl_sfiknbmd7g6cddvdghfkngsawihauowa",
        domain: "aws.us.pangea.cloud",
      }}
    >
      <Container maxWidth="md" sx={{ padding: "2rem" }}>
        <Button component="a" href="/share" variant="contained">Share</Button>{" "}
        <Button variant="contained" onClick={logout}>Logout</Button>
        <AuditLogViewer
          sx={{ marginTop: "1rem" }}
          onSearch={proxy}
          onPageChange={proxy}
        />
      </Container>
    </BrandingThemeProvider>
  );
};
