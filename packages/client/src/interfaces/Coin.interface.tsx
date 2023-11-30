export default interface ICoin {
    symbol: string;
    id: string;
    rank: number;
    name: string;
    supply: number;
    maxSupply: number | null;
    marketCapUsd: number | null;
    volumeUsd24Hr: number | null;
    priceUsd: number;
    changePercent24Hr: number | null;
    vwap24Hr: number | null;
    explorer: string | null;
}