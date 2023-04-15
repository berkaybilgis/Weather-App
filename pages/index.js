import { Inter } from "next/font/google";
import Header from "../components/Header";
import Container from "../components/Container";
import { WeatherProvider } from "../context/WeatherContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    // Provider bütün verileri kapsayacak şekilde yerleştirildi
    <WeatherProvider>
      <div className="container">
        <Header />
        <Container />
      </div>
    </WeatherProvider>
  );
}
