"use client";
import { useLogout, useSignerStatus, useUser } from "@account-kit/react";
import { Login } from "./components/Login";
import { Game } from "./components/Game";

export default function Home() {
  const user = useUser();

  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  console.log(user);

  return (
    <main>
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
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      ></link>
    </main>
  );
}
