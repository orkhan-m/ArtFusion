import {
  AlchemyAccountsUIConfig,
  cookieStorage,
  createConfig,
} from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { sepolia } from "@account-kit/infra";
import { ALCHEMY_ACCOUNTS_API_KEY } from "./app/consts";
import { Alchemy, Network } from "alchemy-sdk";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [[{ type: "email" as const }]],
  },
};

export const config = createConfig(
  {
    apiKey: ALCHEMY_ACCOUNTS_API_KEY, // TODO: add your Alchemy API key - setup your app and embedded account config in the alchemy dashboard (https://dashboard.alchemy.com/accounts) - if you don't want to leak api keys, you can proxy to a backend and set the rpcUrl instead here
    chain: sepolia,
    ssr: true, // defers hydration of the account state to the client after the initial mount solving any inconsistencies between server and client state (read more here: https://accountkit.alchemy.com/react/ssr)
    storage: cookieStorage, // persist the account state using cookies (read more here: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state)
  },
  uiConfig
);

export const queryClient = new QueryClient();

const alchemyConfig = {
  apiKey: ALCHEMY_ACCOUNTS_API_KEY,
  network: Network.ETH_SEPOLIA,
};

export const alchemyClient = new Alchemy(alchemyConfig);
