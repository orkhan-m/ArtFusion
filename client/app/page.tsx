"use client";

import { Login } from "./components/Login";
import { Game } from "./components/Game";
import Modal from "react-modal";
import { useLogout, useSignerStatus } from "@alchemy/aa-alchemy/react";

Modal.setAppElement("#main");

export default function Home() {
  const { isInitializing, isAuthenticating, isConnected, status } =
    useSignerStatus();
  const isLoading =
    isInitializing || (isAuthenticating && status !== "AWAITING_EMAIL_AUTH");
  const { logout } = useLogout();

  return (
    <main id="main">
      {isLoading ? (
        <>Loading...</>
      ) : isConnected ? (
        <div className="wrapper">
          <div className="header">
            <button className="btn btn-primary mt-6" onClick={() => logout()}>
              Log out
            </button>
          </div>
          <Game />
        </div>
      ) : (
        <Login />
      )}
    </main>
  );
}
