import { Box, Typography } from "@mui/material";
import React from "react";
import DisplayStatisticsData from "./DisplayStatisticsData";
import DisplayAnalysisSection from "./DisplayAnalysisSection";

const Dashboard = () => {
    
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h4">Dashboard</Typography>
            <DisplayStatisticsData />
            <DisplayAnalysisSection />
        </Box>
    )
}

export default Dashboard;