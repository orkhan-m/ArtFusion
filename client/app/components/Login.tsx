"use client";

import { useAuthenticate, useSignerStatus } from "@alchemy/aa-alchemy/react";
import { FormEvent, useCallback, useState } from "react";
import { Button } from "./Button";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const { authenticate } = useAuthenticate();
  const login = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    authenticate({ type: "email", email });
  };

  const { status } = useSignerStatus();
  const isAwaitingEmail = status === "AWAITING_EMAIL_AUTH";

  return (
    <div className="flex min-w-80 flex-row justify-center rounded-lg bg-white p-10 dark:bg-[#0F172A]">
      {isAwaitingEmail ? (
        <div className="text-[18px] font-semibold">Check your email!</div>
      ) : (
        <form className="flex flex-col gap-8" onSubmit={login}>
          <div className="text-[18px] font-semibold">
            Log in to the Embedded Accounts Demo!
          </div>
          <div className="flex flex-col justify-between gap-6">
            <input
              className="flex-1 rounded-lg border border-[#CBD5E1] p-3 dark:border-[#475569] dark:bg-slate-700 dark:text-white dark:placeholder:text-[#E2E8F0]"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={onEmailChange}
            />
            <Button type="submit">Log in</Button>
          </div>
        </form>
      )}
    </div>
  );
};
