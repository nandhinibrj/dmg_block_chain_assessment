export type MiningHardware = {
    id: number;
    name: string;
    location: string;
    hashRate: string
};

export type MiningStatistics = {
  totalHashRate: number;
  activeMiners: number;
  miningRevenue: number;
}

export type User = {
  name: string;
  email: string;
  password: string;
}
