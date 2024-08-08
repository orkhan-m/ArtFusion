"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { main } from "./test";
import Game from "./game";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  console.log(user);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          {/* <p className="text-xl font-bold">Success!</p>
          <div>You are logged in as {user.email ?? "anon"}.</div>
          <button className="btn btn-primary mt-6" onClick={() => main()}>
            Get token info
          </button>
          <button className="btn btn-primary mt-6" onClick={() => logout()}>
            Log out
          </button> */}
          <Game />
        </div>
      ) : (
        <button className="btn btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </main>
  );
}
