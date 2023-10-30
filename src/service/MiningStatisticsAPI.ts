const BASE_URL = "http://localhost:8000/api"
export class MiningStatisticsAPI {
    public async getMiningStatistics(): Promise<Response> {
      const response = await fetch(
        `${BASE_URL}/get_mining_statistics`,
      );
      return await response.json();
    }

    public async getBitCoinPrice(): Promise<Response> {
      const response = await fetch(
        `${BASE_URL}/get_bitcoin_price`,
      );
      return await response.json();
    }
}