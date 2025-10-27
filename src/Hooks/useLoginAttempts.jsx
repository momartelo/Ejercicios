import { useState, useEffect } from "react";

export const useLoginAttempts = (maxAttempts = 3, blockTime = 30000) => {
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockedUntil, setBlockedUntil] = useState(null);

  const addAttempt = () => {
    const attempts = loginAttempts + 1;
    setLoginAttempts(attempts);

    if (attempts >= maxAttempts) {
      setIsBlocked(true);
      const unblockTime = Date.now() + blockTime;
      setBlockedUntil(unblockTime);

      setTimeout(() => {
        setIsBlocked(false);
        setLoginAttempts(0);
      }, blockTime);
    }
  };

  const resetAttempts = () => {
    setLoginAttempts(0);
    setIsBlocked(false);
    setBlockedUntil(null);
  };

  return {
    loginAttempts,
    isBlocked,
    blockedUntil,
    addAttempt,
    resetAttempts,
  };
};
