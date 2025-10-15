import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const startNewGame = () => {
    // Generate a unique game ID
    const gameId = Date.now().toString();
    navigate(`/game/${gameId}`);
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Nonogram Puzzle Game</h1>
      <div style={{ marginTop: "50px" }}>
        <button
          onClick={startNewGame}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Start New Game
        </button>
      </div>
      <p style={{ marginTop: "30px", color: "#666" }}>
        Click "Start New Game" to begin a new puzzle. Your game will be saved
        automatically and persist even after page reload!
      </p>
    </div>
  );
}
