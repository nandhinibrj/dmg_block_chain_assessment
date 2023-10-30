import React from "react";
import { MiningStatisticsAPI } from "service/MiningStatisticsAPI";
import { MiningStatistics } from "types/model";
import Columns from "./Columns";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";

const DisplayStatisticsData = () => {
    const miningStatisticsAPI = new MiningStatisticsAPI();
    const [isFetching, setFetching] = React.useState<boolean>(false);
    const [isFetchingBitCoin, setFetchingBitcoin] = React.useState<boolean>(false);
    const [miningStatisticsData, setMiningStatisticsData] = React.useState<
    MiningStatistics[]
    >([]);
    const [bitcoinPrice, setBitCoinPrice] = React.useState<
    number
    >();

    React.useEffect(() => {
        const getMiningStatisticsData = async () => {
          setFetching(true);
          const results = await miningStatisticsAPI
            .getMiningStatistics()
            .then((response) => response)
            .finally(() => setFetching(false));
            setMiningStatisticsData(results as unknown as MiningStatistics[]);
        };
        const getLatestBitcoinPrice = async () => {
            setFetchingBitcoin(true);
            const results = await miningStatisticsAPI
              .getBitCoinPrice()
              .then((response) => response)
              .finally(() => setFetchingBitcoin(false));
              setBitCoinPrice(results as unknown as number);
          };
        getMiningStatisticsData();
        getLatestBitcoinPrice()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    if(isFetching) {
        return <CircularProgress />
    } 

    return (
        <Columns columns={4}>
        {miningStatisticsData && miningStatisticsData.map(data => Object.entries(data).map(([field, value], index) => (
                <Card key={index} sx={{ minWidth: 150 }}>
                    <CardContent>
                        <Typography variant="h5" textTransform="capitalize">{field}</Typography>
                        <Typography variant="h6">{value}</Typography>
                    </CardContent>
                </Card>
            )))}
            <Card sx={{ minWidth: 150 }}>
                <CardContent>
                {isFetchingBitCoin ? 
                    <CircularProgress /> 
                    :
                    <>
                        <Typography variant="h5" textTransform="capitalize">Bitcoin Price</Typography>
                        <Typography variant="h6">{bitcoinPrice}</Typography>
                    </>
                } 
                </CardContent>
            </Card>
    </Columns>
    )
}

export default DisplayStatisticsData;