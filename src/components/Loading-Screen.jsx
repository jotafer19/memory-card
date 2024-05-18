import "../styles/Loading-Screen.css";
import pikachuRunning from "../assets/images/pikachu-running.gif";
import { useEffect } from "react";
import fetchPokemon from "../fetch";

export default function LoadingScreen({
  goalScore,
  handlePokemonData,
  handleGameStatus,
  handleLoading,
}) {
  function sleep(timeInMS) {
    return new Promise((resolve) => setTimeout(resolve, timeInMS));
  }

  useEffect(() => {
    async function getPokemon() {
      try {
        const data = await fetchPokemon(goalScore());
        handlePokemonData(data);
        await sleep(4000);
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
      } finally {
        handleLoading(false);
        handleGameStatus("game");
      }
    }

    getPokemon();
  }, []);

  return (
    <div className="loading screen">
      <div className="loading-container">
        <div className="loading-image-container">
          <img
            className="loading-gif"
            src={pikachuRunning}
            alt="Pikachu running"
          />
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
