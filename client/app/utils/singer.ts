import { AlchemySigner } from "@alchemy/aa-alchemy";
import { ALCHEMY_ACCESS_KEY } from "../consts";

export const signer = new AlchemySigner({
  client: {
    // This is created in your dashboard under `https://dashboard.alchemy.com/settings/access-keys`
    // NOTE: it is not recommended to expose your API key on the client, instead proxy requests to your backend and set the `rpcUrl`
    // here to point to your backend.
    connection: { apiKey: ALCHEMY_ACCESS_KEY },
    iframeConfig: {
      // you will need to render a container with this id in your DOM
      iframeContainerId: "turnkey-iframe-container",
    },
  },
});
