import { Alchemy, Network, Utils } from "alchemy-sdk";

const settings = {
  apiKey: "FR2g1y9xoaYNOgyitJom2lSxBQl-7U1F",
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

export const main = async () => {
  const ownerAddr = "0x2e5aD363bAa38960c679bf52dF0E633560B28E87";
  let balance: any = await alchemy.core.getBalance(ownerAddr, "latest");
  balance = Utils.formatEther(balance);
  console.log(`Balance of ${ownerAddr}: ${balance} ETH`);
};
