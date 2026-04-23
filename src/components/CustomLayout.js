"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

// Paths where Header and Footer should NOT render
const EXCLUDED_PATHS = [];

const CustomLayout = ({ children }) => {
  const pathname = usePathname();
  const [isBooting, setIsBooting] = useState(true);
  const shouldHideLayout = EXCLUDED_PATHS.includes(pathname);
  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  return (
    <>
      {!shouldHideLayout && (
        <Header isBooting={isBooting} onBootComplete={handleBootComplete} />
      )}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default CustomLayout;
