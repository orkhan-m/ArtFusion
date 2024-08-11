import { z } from "zod";
import { AlchemyGasManagerConfig } from "@alchemy/aa-alchemy";
import {
  SupportedAccountTypes,
  cookieStorage,
  createConfig,
} from "@alchemy/aa-alchemy/config";
import { SmartAccountClientOptsSchema, sepolia } from "@alchemy/aa-core";
import { QueryClient } from "@tanstack/react-query";
import { ALCHEMY_ACCOUNTS_API_KEY, ALCHEMY_GAS_POLICY_ID } from "./app/consts";
import { Network, Alchemy } from "alchemy-sdk";

export const chain = sepolia;
export const config = createConfig({
  apiKey: ALCHEMY_ACCOUNTS_API_KEY,
  chain,
  ssr: true,
  storage: cookieStorage,
});

export const queryClient = new QueryClient();
export const accountType: SupportedAccountTypes = "MultiOwnerModularAccount";
export const gasManagerConfig: AlchemyGasManagerConfig = {
  policyId: ALCHEMY_GAS_POLICY_ID,
};
type SmartAccountClienOptions = z.infer<typeof SmartAccountClientOptsSchema>;
export const accountClientOptions: Partial<SmartAccountClienOptions> = {
  txMaxRetries: 20,
};

// to get nfts we use this config => it is working
const alchemyConfig = {
  apiKey: ALCHEMY_ACCOUNTS_API_KEY,
  network: Network.ETH_SEPOLIA,
};
export const alchemyClient = new Alchemy(alchemyConfig);
