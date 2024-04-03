"use client";

import Protected from "../app/Protected";
import {
  StoreProxyApiRef,
  StoreFileViewer,
} from "@pangeacyber/react-mui-store-file-viewer";
import { useAuth } from "@pangeacyber/react-auth";
import { BrandingThemeProvider } from "@pangeacyber/react-mui-branding";
import { Button, Container } from "@mui/material";

export default function Share() {
  return (
    <Protected>
      <ShareView />
    </Protected>
  );
}

const ShareView: React.FC = () => {
  const { getToken, logout } = useAuth();
  const token = getToken();
  const proxy = makeProxy(token!!);

  return (
    <BrandingThemeProvider
      brandingId="pro_icmwkw37wnszg7k7jv3del73ykbamjkf"
      auth={{
        clientToken: "pcl_sfiknbmd7g6cddvdghfkngsawihauowa",
        domain: "aws.us.pangea.cloud",
      }}
    >
      <Container maxWidth="md" sx={{ padding: "2rem" }}>
        {/* Note we've added a button to navigate to the audit page */}
        <Button component="a" href="/" variant="contained">
          Audit
        </Button>

        <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>
        <hr />
        {/* We'll add a max count of 7 with the default of 1 for share links
            that way by default, share links are used once.
        */}
        <StoreFileViewer
          apiRef={proxy}
          configurations={{
            settings: {
              defaultAccessCount: 1,
              maxAccessCount: 7,
            },
          }}
        />
      </Container>
    </BrandingThemeProvider>
  );
};

// We proxy all calls through the edge runtime
const makeProxy = (token: string): StoreProxyApiRef => {
  const proxyCall = (queryParam: string, method: string = "POST") => {
    return async (data: any): Promise<any> => {
      const url = new URL("/api/share", window.location.origin);
      url.searchParams.append("path", queryParam);

      const body: BodyInit =
        data instanceof FormData ? (data as FormData) : JSON.stringify(data);

      const resp = await fetch(url.toString(), {
        method,
        body,
        headers: {
          Authorization: token!!,
        },
      });
      console.log(resp);
      return resp.json();
    };
  };

  return {
    list: proxyCall("list"),
    get: proxyCall("get"),
    getArchive: proxyCall("get_archive"),
    share: {
      list: proxyCall("share/link/list"),
      get: proxyCall("share/link/get"),
      delete: proxyCall("share/link/delete"),
      create: proxyCall("share/link/create"),
      send: proxyCall("share/link/send"),
    },
    delete: proxyCall("delete"),
    update: proxyCall("update"),
    upload: proxyCall("put"),
    folderCreate: proxyCall("folder/create"),
  };
};
