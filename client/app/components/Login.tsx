"use client";

import { useAuthModal } from "@account-kit/react";

export const Login: React.FC = () => {
  const { openAuthModal } = useAuthModal();
  return (
    <div className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      <h2 className="font-bold">ArtFusion</h2>
      <h3>Become the Next Elon Musk: Create Unique Ideas with NFTs and AI</h3>
      <button className="btn btn-primary" onClick={openAuthModal}>
        Login
      </button>
    </div>
  );
};
