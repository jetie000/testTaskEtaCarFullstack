/*
  Warnings:

  - The `maxSupply` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `marketCapUsd` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `volumeUsd24Hr` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changePercent24Hr` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `vwap24Hr` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `supply` on the `Coin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priceUsd` on the `Coin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priceUsd` on the `CoinPrice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `circulatingSupply` on the `CoinPrice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "supply",
ADD COLUMN     "supply" DOUBLE PRECISION NOT NULL,
DROP COLUMN "maxSupply",
ADD COLUMN     "maxSupply" DOUBLE PRECISION,
DROP COLUMN "marketCapUsd",
ADD COLUMN     "marketCapUsd" DOUBLE PRECISION,
DROP COLUMN "volumeUsd24Hr",
ADD COLUMN     "volumeUsd24Hr" DOUBLE PRECISION,
DROP COLUMN "priceUsd",
ADD COLUMN     "priceUsd" DOUBLE PRECISION NOT NULL,
DROP COLUMN "changePercent24Hr",
ADD COLUMN     "changePercent24Hr" DOUBLE PRECISION,
DROP COLUMN "vwap24Hr",
ADD COLUMN     "vwap24Hr" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "CoinPrice" DROP COLUMN "priceUsd",
ADD COLUMN     "priceUsd" DOUBLE PRECISION NOT NULL,
DROP COLUMN "circulatingSupply",
ADD COLUMN     "circulatingSupply" DOUBLE PRECISION NOT NULL;
