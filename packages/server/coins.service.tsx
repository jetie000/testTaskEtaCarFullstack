import { PrismaClient } from "@prisma/client";
import { variables } from "../client/src/variables"
import axios from "axios"

axios.defaults.baseURL = variables.API_URL;
let prismaClient = new PrismaClient();

export const CoinService = {

    // async getAll(page: number, limit: number) {
    //     let offset = Number(page) < 1 ? 0 : (Number(page) - 1) * variables.COINS_PER_PAGE;
    //     return axios.get('assets?limit=' + limit + '&offset=' + offset);
    // },
    // async getById(id: string) {
    //     return axios.get('assets/' + id);
    // },
    // async searchAll(searchStr: string, page: number) {
    //     let offset = Number(page) < 1 ? 0 : (Number(page) - 1) * (variables.COINS_PER_SEARCH - 1);
    //     let searchString = searchStr === '' ? '000000000000000' : searchStr;
    //     return axios.get('assets?limit=' + (offset + variables.COINS_PER_SEARCH) + '&search=' + searchString);
    // },
    // async getPriceGraph(id: string, period: string) {
    //     let d = new Date();
    //     switch (period) {
    //         case 'month':
    //             let data = axios.get('assets/' + id + '/history?interval=h12&start=' + (Number(d) - (variables.MILL_PER_DAY * variables.DAYS_PER_WEEK * 4)) + '&end=' + Number(d));
    //             console.log((await data).data);
    //             return data;
    //         case 'day':
    //             return axios.get('assets/' + id + '/history?interval=m30&start=' + (Number(d) - variables.MILL_PER_DAY) + '&end=' + Number(d));
    //         case 'week': default:
    //             return axios.get('assets/' + id + '/history?interval=h2&start=' + (Number(d) - (variables.MILL_PER_DAY * variables.DAYS_PER_WEEK)) + '&end=' + Number(d));
    //     }
    // },
    // async getByIds(ids: string) {
    //     let idsTemp = ids;
    //     if (ids === '')
    //         idsTemp = '000000000000000';
    //     return axios.get('assets?ids=' + idsTemp);
    // }
    async getAll(page: number, limit: number) {
        let offset = Number(page) < 1 ? 0 : (Number(page) - 1) * variables.COINS_PER_PAGE;
        await prismaClient.$connect();
        const coins = await prismaClient.coin.findMany({
            skip: offset,
            take: limit
        })
        await prismaClient.$disconnect();
        return coins;
    },
    async getById(id: string) {
        await prismaClient.$connect();
        const coins = await prismaClient.coin.findFirst({
            where: {
                id: id
            }
        })
        await prismaClient.$disconnect();
        return coins;
    },
    async searchAll(searchStr: string, page: number) {
        let offset = Number(page) < 1 ? 0 : (Number(page) - 1) * (variables.COINS_PER_SEARCH - 1);
        let searchString = searchStr === '' ? '000000000000000' : searchStr;
        await prismaClient.$connect();
        const coins = await prismaClient.coin.findMany({
            where: {
                id: { contains: searchString }
            },
            take: (offset + variables.COINS_PER_SEARCH)
        })
        await prismaClient.$disconnect();
        return coins;
    },
    async getPriceGraph(rank: number, period: string) {
        await prismaClient.$connect();
        
        const coinPrices = await prismaClient.coinPrice.findMany({
            where: {
                coinRank: rank
            },
            orderBy: {
                time: 'desc'
            },
            take: period === 'month' ? 90
                : (period === 'week' ? 14 : 3) 
        })
        
        await prismaClient.$disconnect();
        return coinPrices.map(price => {
            return {
                ...price,
                time : price.time.toString()
            }
        });

    },
    async getByIds(ids: string) {
        let idsTemp = ids;
        if (ids === '')
            idsTemp = '000000000000000';
        let idsTempArr = idsTemp.split(' ');
        await prismaClient.$connect();
        const coins = await prismaClient.coin.findMany({
            where: {
                id : {
                    in : idsTempArr
                }
            }
        })
        await prismaClient.$disconnect();
        return coins;
    }
}
