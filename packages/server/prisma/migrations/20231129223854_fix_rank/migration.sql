/*
  Warnings:

  - The primary key for the `Coin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `coinRank` column on the `CoinPrice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `rank` on the `Coin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CoinPrice" DROP CONSTRAINT "CoinPrice_coinRank_fkey";

-- AlterTable
ALTER TABLE "Coin" DROP CONSTRAINT "Coin_pkey",
DROP COLUMN "rank",
ADD COLUMN     "rank" INTEGER NOT NULL,
ADD CONSTRAINT "Coin_pkey" PRIMARY KEY ("rank");

-- AlterTable
ALTER TABLE "CoinPrice" DROP COLUMN "coinRank",
ADD COLUMN     "coinRank" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Coin_rank_key" ON "Coin"("rank");

-- AddForeignKey
ALTER TABLE "CoinPrice" ADD CONSTRAINT "CoinPrice_coinRank_fkey" FOREIGN KEY ("coinRank") REFERENCES "Coin"("rank") ON DELETE SET NULL ON UPDATE CASCADE;
