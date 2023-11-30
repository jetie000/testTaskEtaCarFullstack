import { initTRPC } from '@trpc/server';
import { CoinService } from './coins.service';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  getAll: t.procedure.input(z.object({
    page: z.number(),
    limit: z.number()
  })).query(async ({ input }) => {
    return (await CoinService.getAll(input.page, input.limit));
  }),
  getById: t.procedure.input(z.object({
    id: z.string()
  })).query(async ({ input }) => {
    return (await CoinService.getById(input.id));
  }),
  searchAll: t.procedure.input(z.object({
    searchStr: z.string(),
    page: z.number()
  })).query(async ({ input }) => {
    return (await CoinService.searchAll(input.searchStr, input.page) || {});
  }),
  getPriceGraph: t.procedure.input(z.object({
    rank: z.number(),
    period: z.string()
  })).query(async ({ input }) => {
    return (await CoinService.getPriceGraph(input.rank, input.period));
  }),
  getByIds: t.procedure.input(z.object({
    ids: z.string()
  })).query(async ({ input }) => {
    return (await CoinService.getByIds(input.ids));
  })
});

export type AppRouter = typeof appRouter;