import express from "express";
import cors from 'cors'
import { appRouter } from "./trpc";
import * as trpcExpress from '@trpc/server/adapters/express';

const app = express();
const port = 8080;
app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter
  })
)

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
