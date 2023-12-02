import express from "express";
import cors from 'cors'
import { appRouter } from "./trpc";
import * as trpcExpress from '@trpc/server/adapters/express';
import { variables } from "../client/src/variables"
import axios from "axios"
import { PrismaClient } from "@prisma/client";
import ICoin from "./interfaces/Coin.interface";


const app = express();
const port = 8080;
app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter
  })
)

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
