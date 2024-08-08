"use client";

import { useAuthModal } from "@account-kit/react";

export const Login: React.FC = () => {
  const { openAuthModal } = useAuthModal();
  return (
    <div className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      <button className="btn btn-primary" onClick={openAuthModal}>
        Login
      </button>
    </div>
  );
};
