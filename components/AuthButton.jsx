"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { signOut } from "@/app/actions";

const AuthButton = ({ user }) => {
  const [showAuthModal, setAuthModal] = useState(false);
  if (user) {
    return (
      <form action={signOut}>
        <Button
          variant="default"
          size="sm"
          type="submit"
          className="bg-[#8EB69B] text-[#051F20]
            hover:bg-[#235347] hover:text-white
            transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </form>
    );
  }
  return (
    <>
      <Button
        onClick={() => setAuthModal(true)}
        variant="default"
        size="sm"
        className="
            bg-[#8EB69B] text-[#051F20]
            hover:bg-[#235347] hover:text-white
            transition-colors
            "
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </Button>
    </>
  );
};

export default AuthButton;
