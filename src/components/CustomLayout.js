"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";

// Paths where Header and Footer should NOT render
const EXCLUDED_PATHS = [];

const CustomLayout = ({ children }) => {
  const pathname = usePathname();
  const shouldHideLayout = EXCLUDED_PATHS.includes(pathname);

  return (
    <>
      {!shouldHideLayout && <CustomCursor />}
      {!shouldHideLayout && <Header />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default CustomLayout;
