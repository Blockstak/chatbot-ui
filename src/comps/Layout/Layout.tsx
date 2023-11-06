import { Poppins } from "next/font/google";

interface ILayoutProps {
  children: React.ReactNode;
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function Layout({ children }: ILayoutProps) {
  return <div className={`${poppins.variable} font-poppins`}>{children}</div>;
}
