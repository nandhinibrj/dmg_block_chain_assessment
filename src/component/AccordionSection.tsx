import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";

type Props = AccordionProps & {
  name: string;
  description: string;
  children: React.ReactNode;
};
const AccordionSection: React.FC<Props> = ({
  name,
  description,
  children,
  ...props
}) => (
  <Accordion
  {...props}
  >
    <AccordionSummary
      expandIcon={<ExpandMore />}
      aria-controls={name}
      id={name}
    >
      <Typography sx={{ fontWeight:"bold", width: "30%", flexShrink: 0 }}>{name}</Typography>
      <Typography sx={{ color: "text.secondary" }}>{description}</Typography>
    </AccordionSummary>
    <AccordionDetails
      sx={{ display: "flex", flexDirection: "column", paddingY: 0 }}
    >
      <Divider />
      {children}
    </AccordionDetails>
  </Accordion>
);

export default React.memo(AccordionSection);
