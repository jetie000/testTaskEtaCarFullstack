-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supply" TEXT NOT NULL,
    "maxSupply" TEXT,
    "marketCapUsd" TEXT,
    "volumeUsd24Hr" TEXT,
    "priceUsd" TEXT NOT NULL,
    "changePercent24Hr" TEXT,
    "vwap24Hr" TEXT,
    "explorer" TEXT,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinPrice" (
    "id" SERIAL NOT NULL,
    "priceUsd" TEXT NOT NULL,
    "time" BIGINT NOT NULL,
    "circulatingSupply" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "coinId" TEXT,

    CONSTRAINT "CoinPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coin_id_key" ON "Coin"("id");

-- AddForeignKey
ALTER TABLE "CoinPrice" ADD CONSTRAINT "CoinPrice_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
