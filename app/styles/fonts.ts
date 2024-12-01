import localFont from "next/font/local";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const satoshi = localFont({
  src: "../fonts/SatoshiVF.woff",
  variable: "--font-satoshi",
  weight: "100 900",
});
const sono = localFont({
  src: "../fonts/SonoVF.ttf",
  variable: "--font-sono",
  weight: "100 900",
});
const apfelGrotezk = localFont({
  src: "../fonts/ApfelGrotezkVF.woff2",
  variable: "--font-apfel",
  weight: "100 900",
});
const figtree = localFont({
  src: "../fonts/FigtreeVF.ttf",
  variable: "--font-figtree",
  weight: "100 900",
});
const telma = localFont({
  src: "../fonts/TelmaVF.woff2",
  variable: "--font-telma",
  weight: "100 900",
});

export { geistMono, geistSans, satoshi, sono, apfelGrotezk, figtree, telma };
