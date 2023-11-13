import {test, expect} from '@jest/globals'
import { appRouter } from '../../../server/trpc'
import ICoin from '@/interfaces/Coin.interface'

describe('trpc tests', () => {
    test('getAll method limit', async () => {
        const caller = appRouter.createCaller({})
        const res: ICoin[] = (await caller.getAll({page: 1, limit: 50})).data;
        expect(res).toHaveLength(50)
    })

    test('getAll method second page', async () => {
        const caller = appRouter.createCaller({})
        const res: ICoin[]  = (await caller.getAll({page: 2, limit: 50})).data;
        expect(res[0].rank).toEqual("51");
    })

    test('getById method', async () => {
        const caller = appRouter.createCaller({})
        const res: ICoin = (await caller.getById({id: "bitcoin"})).data;
        expect(res.id).toEqual("bitcoin");
    })

    test('searchAll method with results', async () => {
        const caller = appRouter.createCaller({})
        const res: ICoin[] = (await caller.searchAll({searchStr: "b", page: 2})).data;
        expect(res).toHaveLength(11);
    })

    test('searchAll method no results', async () => {
        const caller = appRouter.createCaller({})
        const res: ICoin[] = (await caller.searchAll({searchStr: "bgfdhdzfxngfhudgfds", page: 2})).data;
        expect(res).toHaveLength(0);
    })
    
    test('getPriceGraph method week time between prices', async () => {
        const caller = appRouter.createCaller({})
        const res = (await caller.getPriceGraph({id: 'bitcoin', period: "week"})).data;
        expect(res[1].time - res[0].time).toBe(7200000);
    })
    
    test('getPriceGraph method day time between prices', async () => {
        const caller = appRouter.createCaller({})
        const res = (await caller.getPriceGraph({id: 'bitcoin', period: "day"})).data;
        expect(res[1].time - res[0].time).toBe(1800000);
    })
    
    test('getPriceGraph method month time between prices', async () => {
        const caller = appRouter.createCaller({})
        const res = (await caller.getPriceGraph({id: 'bitcoin', period: "month"})).data;
        expect(res[1].time - res[0].time).toBe(43200000);
    })

    test('getByIds method with response', async () => {
        const caller = appRouter.createCaller({})
        const res = (await caller.getByIds({ids: 'bitcoin'})).data;
        expect(res).toHaveLength(1);
    })

    test('getByIds method without response', async () => {
        const caller = appRouter.createCaller({})
        const res = (await caller.getByIds({ids: 'fdhjsfhdsuifgsdhfj'})).data;
        expect(res).toHaveLength(0);
    })

})