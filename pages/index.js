import { Inter } from "next/font/google";
import Header from "./components/Header";
import Container from "./components/Container";
import { WeatherProvider } from "./context/WeatherContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <WeatherProvider>
      <Header />
      <Container />
    </WeatherProvider>
  );
}
