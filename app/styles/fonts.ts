import localFont from "next/font/local";

const satoshi = localFont({
  src: "../fonts/SatoshiVF.woff2",
  variable: "--font-satoshi",
  weight: "100 900",
});

export { satoshi };
