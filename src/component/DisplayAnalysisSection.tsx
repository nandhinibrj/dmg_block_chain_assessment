import React from "react";
import AccordionSection from "./AccordionSection";
import { Box, CircularProgress, Typography } from "@mui/material";
// import { MiningHardwareAPI } from "service/MiningHardwareAPI";

const DisplayAnalysisSection = () => {
  // const miningHardwareAPI = new MiningHardwareAPI();
  // const [isFetching, setFetching] = React.useState<boolean>(false);
  // const [hashRate, setHashRate] = React.useState<number>();

  // React.useEffect(() => {
  //   const getMiningHashRate = async () => {
  //     setFetching(true);
  //     const results = await miningHardwareAPI
  //       .getHashRate()
  //       .then((response) => response)
  //       .finally(() => setFetching(false));
  //     setHashRate(results as unknown as number);
  //   };
  //   getMiningHashRate();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (isFetching) {
  //   return <CircularProgress />;
  // }

  return (
    <>
      <AccordionSection
        name="Hash Calculation"
        description="How many hashes does an Antminer S1 expect to complete over a time period?"
      >
        <Box display="flex" margin={1} gap={1}>
          <Typography variant="subtitle2">
            During a 10 day period how many hashes does an Antminer S1 expect to
            complete?
          </Typography>
          <Typography variant="body2">{95.47337585632621  * 60 * 60 * 24}</Typography>
        </Box>
      </AccordionSection>
      <AccordionSection
        name="Bitcoin Profitability"
        description="How many bitcoin does an Antminer S1 expect to win over a time period?"
      >
        <Box display="flex" margin={1} gap={1}>
          <Typography variant="subtitle2">
            We would expect to mine 7 bitcoin every 10 ExaHash. How many bitcoin
            does an Antminer S1 expect to win over 10 days?
          </Typography>
          <Typography variant="body2">122 Bitcoins</Typography>
        </Box>
      </AccordionSection>
      <AccordionSection
        name="Percentage of yield"
        description="What percent of expected yield did it achieve ?"
      >
        <Box display="flex" margin={1} gap={1}>
          <Typography variant="subtitle2">
            Our Antminer S1 really won 1 bitcoin over a 10 day period. What
            percent of expected yield did it achieve?
          </Typography>
          <Typography variant="body2">122</Typography>
        </Box>
      </AccordionSection>
      <AccordionSection
        name="Miners average hashrate"
        description="What would we expect the miners average hashrate to have been over the period ?"
      >
        <Box display="flex" margin={1} gap={1}>
          <Typography variant="subtitle2">
            Our Antminer S1 really won 1 bitcoin over a 10 day period. What
            would we expect the miners average hashrate to have been over the
            period?
          </Typography>
          <Typography variant="body2">122</Typography>
        </Box>
      </AccordionSection>
    </>
  );
};

export default DisplayAnalysisSection;
