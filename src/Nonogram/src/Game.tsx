import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type State } from "./PlayBoard";
import Board from "./Board";

export default function Game() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [solution, setSolution] = useState<State[][] | null>(null);

  // Create a deterministic game based on gameId
  function createGame(seed: string): State[][] {
    // Use the gameId as a seed for consistent random generation
    const seedNumber = parseInt(seed) || 12345;

    // Simple seeded random function
    let random = seedNumber;
    const seededRandom = () => {
      random = (random * 9301 + 49297) % 233280;
      return random / 233280;
    };

    const grid: State[][] = Array.from({ length: 5 }, () =>
      Array.from({ length: 9 }, () => (seededRandom() > 0.5 ? "confirmed" : "default"))
    );

    return grid;
  }

  useEffect(() => {
    if (gameId) {
      // Generate solution based on gameId for consistency
      const gameSolution = createGame(gameId);
      setSolution(gameSolution);
    }
  }, [gameId]);

  if (!gameId) {
    navigate("/");
    return null;
  }

  if (!solution) {
    return <div>Loading game...</div>;
  }

  return (
    <div>
      <div
        style={{
          padding: "10px 20px",
          //   backgroundColor: "#491414",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Back to Menu
        </button>
        {/* <h3 style={{ margin: 0 }}>Game #{gameId}</h3> */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              const newGameId = Date.now().toString();
              // Navigate to new game without any URL parameters to clear board state
              navigate(`/game/${newGameId}`, { replace: true });
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            New Game
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert(
                "Game URL copied to clipboard! Share it to let others play your exact progress."
              );
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Share Progress
          </button>
        </div>
      </div>
      <Board key={gameId} solution={solution} />
    </div>
  );
}
