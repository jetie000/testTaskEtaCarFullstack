/*
  Warnings:

  - The primary key for the `Coin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `coinId` on the `CoinPrice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rank]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CoinPrice" DROP CONSTRAINT "CoinPrice_coinId_fkey";

-- AlterTable
ALTER TABLE "Coin" DROP CONSTRAINT "Coin_pkey",
ADD CONSTRAINT "Coin_pkey" PRIMARY KEY ("rank");

-- AlterTable
ALTER TABLE "CoinPrice" DROP COLUMN "coinId",
ADD COLUMN     "coinRank" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Coin_rank_key" ON "Coin"("rank");

-- AddForeignKey
ALTER TABLE "CoinPrice" ADD CONSTRAINT "CoinPrice_coinRank_fkey" FOREIGN KEY ("coinRank") REFERENCES "Coin"("rank") ON DELETE SET NULL ON UPDATE CASCADE;
