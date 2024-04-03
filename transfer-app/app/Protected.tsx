import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { AuthProvider, useAuth } from "@pangeacyber/react-auth";

export interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  return (
    <AuthProvider
      loginUrl="https://pdn-fyuxa74m6toqquysmuszcx3wlqpf7iw2.login.aws.us.pangea.cloud"
      config={{
        domain: "aws.us.pangea.cloud",
        clientToken: "pcl_sfiknbmd7g6cddvdghfkngsawihauowa",
      }}
    >
      <RedirectIfNotLoggedIn>{children}</RedirectIfNotLoggedIn>
    </AuthProvider>
  );
};

export default Protected;

const RedirectIfNotLoggedIn: React.FC<ProtectedProps> = ({ children }) => {
  const { authenticated, loading, error, login } = useAuth();

  // Loading happens when the frontend calls out to Pangea's AuthN service with
  // the code (provided in the URL via redirect) and is waiting for the session
  // token.
  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  // error would happen if the user attempts to provide a bad code
  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
       <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!authenticated) {
    // Login is our redirect function that changes window.location to the hosted page and performs
    // other things underneath the hood
    login();
  }

  return children;
};
