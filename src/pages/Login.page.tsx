import { Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("authToken") || ""
  );

  useEffect(() => {
    let currentToken = localStorage.getItem("authToken");
    if (token !== currentToken) {
      localStorage.setItem("authToken", token);
    }
  }, [token]);

  return (
    <Container>
      <Typography variant="h1">Login</Typography>
      <TextField
        label="Token"
        value={token}
        onChange={(e) => {
          e.preventDefault();
          setToken(e.currentTarget.value);
        }}
      />
    </Container>
  );
};

export default LoginPage;
