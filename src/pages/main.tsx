import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import AccordionSection from "component/AccordionSection";
import ManageMiningHardware from "component/ManageMiningHardware";
import Dashboard from "component/Dashboard";
import React from "react";
import DialogModal from "component/DialogModal";
import { Close } from "@mui/icons-material";
import { User } from "types/model";
import Authenticate from "component/Authenticate";
import { UserAPI } from "service/UserAPI";

const Main = () => {
  const userAPI = new UserAPI();
  const [isLoggedin, setIsLoggedin] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<string>("");
  const [user, setUser] = React.useState<User>();

  const handleAction = (action: string) => {
    setAction(action);
    setOpen(true);
  };

  const handleSignOut = () => {
    setAction("signout");
    setIsLoggedin(false);
    setOpen(true);
    displayMessage("You are logged out successfully.");
  };

  const handleAuthentication = () => {
    if (user) {
      if (action === "signup") {
        userAPI.register(user).then((res) => {
          displayMessage(
            res.status === 200
              ? "You are registered successfully!. Login to continue"
              : res.status + " - " + res.statusText
          );
        });
      } else {
        userAPI.login(user.email).then((res) => {
          displayMessage(
            res.status === 200
              ? "You are loggedin successfully. "
              : res.status + " - " + res.statusText
          );
          setIsLoggedin(true);
        });
      }
    }
  };
  const authenticate = () => (
    <DialogModal
      open={open}
      dialogWidth="sm"
      setOpen={setOpen}
      titleSection={
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          <Typography variant="h6" textTransform="capitalize">
            {action}
          </Typography>
          <IconButton size="small" onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Box>
      }
      content={<Authenticate setUser={setUser} action={action} />}
      action={<Button onClick={() => handleAuthentication()}>{action}</Button>}
    />
  );

  const displayMessage = (message: string) => (
    <DialogModal
      open={open}
      setOpen={setOpen}
      dialogWidth="sm"
      titleSection={<Typography variant="body2">{message}</Typography>}
      content={undefined}
      action={<Button onClick={() => setOpen(false)}>Ok</Button>}
    />
  );

  return (
    <Box
      width="98%"
      height="100%"
      display="flex"
      flexDirection="column"
      gap={2}
      padding={2}
    >
      <Box display="flex" flexDirection="row" justifyContent="flex-end" gap={2}>
        <Button disabled={isLoggedin} onClick={() => handleAction("signup")}>
          Sign Up
        </Button>
        <Button disabled={!isLoggedin} onClick={() => handleAction("signin")}>
          Sign In
        </Button>
        <Button onClick={() => handleSignOut()}>Sign out</Button>
      </Box>
      <AccordionSection
        name="Manage Mining Hardware"
        description="Add/Upate/Delete mining hardware..."
      >
        <ManageMiningHardware />
      </AccordionSection>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          margin: 2,
          padding: 4,
        }}
      >
        <Dashboard />
      </Paper>
      {action && action !== "signout" && authenticate()}
    </Box>
  );
};

export default React.memo(Main);
