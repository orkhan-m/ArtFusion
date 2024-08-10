"use client";

import {
  AlchemyAccountProvider,
  AlchemyAccountsProviderProps,
} from "@alchemy/aa-alchemy/react";
import { PropsWithChildren } from "react";
import { config, queryClient } from "@/config";

// [!region providers]
export const Providers = ({
  initialState,
  children,
}: PropsWithChildren<{
  initialState?: AlchemyAccountsProviderProps["initialState"];
}>) => {
  return (
    <AlchemyAccountProvider
      config={config}
      queryClient={queryClient}
      initialState={initialState}
    >
      {children}
    </AlchemyAccountProvider>
  );
};
