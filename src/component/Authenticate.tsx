import React from "react";
import { Box, FormControl, FormGroup } from "@mui/material";
import CustomField from "./CustomField";
import { User } from "types/model";

type Props = {
  setUser: (user: User) => void;
  action: string;
};

const Authenticate: React.FC<Props> = ({ setUser, action }) => {
  const [current, setCurrent] = React.useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const save = React.useCallback(
    (update: Partial<User>) => {
      setCurrent({
        ...current,
        ...update,
      });
      setUser(current);
    },
    [current, setUser]
  );

  return (
    <Box
      component="form"
      sx={{
        "& .MuiDivider-root": { marginY: 1 },
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        "& .MuiButton-root": { m: 1, width: "10ch" },
      }}
    >
      <FormGroup>
        <FormControl variant="standard">
          {action === "signup" && (
            <CustomField
              label="Name"
              required
              value={current?.name}
              onChange={(name: string) => save({ name })}
            />
          )}
          <CustomField
            required
            label="Email"
            type="email"
            value={current?.email ?? ""}
            onChange={(email: string) => save({ email })}
          />
          <CustomField
            required
            label="Password"
            type="password"
            value={current?.password ?? ""}
            onChange={(password: string) => save({ password })}
          />
        </FormControl>
      </FormGroup>
    </Box>
  );
};

export default Authenticate;
