import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { variables } from "../../client/src/variables";

let prismaClient = new PrismaClient();
axios.defaults.baseURL = variables.API_URL;

// СОЗДАНИЕ МОНЕТ

const seedCoins = async () => {
    let data = axios.get('assets?limit=150');
    let prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await prismaClient.coin.createMany({
        data: (await data).data.data.map((coin: any) => {
            return {
                ...coin,
                rank: parseInt(coin.rank),
                supply: parseFloat(coin.supply),
                maxSupply: parseFloat(coin.maxSupply),
                marketCapUsd: parseFloat(coin.marketCapUsd),
                volumeUsd24Hr: parseFloat(coin.volumeUsd24Hr),
                priceUsd: parseFloat(coin.priceUsd),
                changePercent24Hr: parseFloat(coin.changePercent24Hr),
                vwap24Hr: parseFloat(coin.vwap24Hr),
            }
        })
    });
    await prismaClient.$disconnect();
    await seedPrices();
}

// СОЗДАНИЕ ЦЕН 

const seedPrices =  async () => {
    await prismaClient.$connect();
    const coins = await prismaClient.coin.findMany({
        select: {
            id: true,
            rank: true
        }
    })
    coins.forEach(async (coin) => {
        let d = new Date();
        let data = axios.get('assets/' + coin.id + '/history?interval=h12&start=' + (Number(d) - (variables.MILL_PER_DAY * variables.DAYS_PER_WEEK * 4)) + '&end=' + Number(d))
            .then((data) => {
                let coinPrices: any = [];
                data.data.data.forEach((onePrice: any) =>
                    coinPrices.push({
                        ...onePrice,
                        priceUsd: parseFloat(onePrice.priceUsd),
                        circulatingSupply: parseFloat(onePrice.circulatingSupply),
                        coinRank: coin.rank
                    })
                )
                return coinPrices
            })
            .then(async (coinPrices) => {
                await prismaClient.coinPrice.createMany({
                    data: coinPrices
                })
            })
    })
    await prismaClient.$disconnect();
};

seedCoins();