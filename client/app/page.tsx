"use client";

import { Login } from "./components/Login";
import { Game } from "./components/Game";
import Modal from "react-modal";
import { useLogout, useSignerStatus, useUser } from "@account-kit/react";

Modal.setAppElement("#main");

export default function Home() {
  const user = useUser();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <main id="main">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
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
