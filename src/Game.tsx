import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Square from "./Components/Square";

interface ScoreType {
  [key: string]: number;
}

// 처음 게임판 상태
const initialGameState = ["", "", "", "", "", "", "", "", ""];
// 처음 스코어판 상태
const initialScores: ScoreType = { O: 0, X: 0 };
// 승자가 되는 경우의 수
const casesOfWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Game = (): JSX.Element => {
  // 게임판 상태
  const [gameState, setGameState] = useState(initialGameState);
  // 현재 선수
  const [currentPlayer, setCurrentPlayer] = useState("X");
  // 스코어판 상태
  const [scores, setScores] = useState(initialScores);

  useEffect(() => {
    // 게임판 상태가 바뀌면 선수 변경
    changePlayer();
    // 승자 확인
    checkForWinner();
  }, [gameState]);

  // 선수 변경 함수
  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  // 승자 확인 함수
  const checkForWinner = () => {
    for (let i = 0; i < casesOfWin.length; i++) {
      // 승자 경우의 수를 순차적으로 뽑는다.
      const [a, b, c] = casesOfWin[i];
      // 게임판에 놓여진 수가 승자 경우의 수와 모두 일치하면 승자가 된다.
      if (
        gameState[a] &&
        gameState[a] == gameState[b] &&
        gameState[a] == gameState[c]
      ) {
        setTimeout(() => handleWin(), 300);
      }
    }

    // 게임판에 빈 칸이 없을 시
    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 300);
    }
  };

  // 승자 결정 시 핸들링할 함수
  const handleWin = () => {
    alert(`승자는 ${currentPlayer}입니다! 축하합니다!`);

    // 스코어 상태를 기록하기 위해 객체 복사
    const historyScores = { ...scores };
    // 이긴 선수의 스코어 1 증가
    const winnerScore = historyScores[currentPlayer] + 1;
    // 스코어 기록 객체에 이긴 선수 스코어 주입
    historyScores[currentPlayer] = winnerScore;
    // 스코어 상태를 스코어 기록 객체의 상태로 업데이트
    setScores(historyScores);
    console.log("현재 스코어 기록", historyScores);

    localStorage.setItem("scores", JSON.stringify(historyScores));

    resetBoard();
  };

  // 무승부 결정 시 핸들링할 함수
  const handleDraw = () => {
    alert("무승부입니다. 게임을 다시 시작합니다.");
    resetBoard();
  };

  // 게임판 리셋 함수
  const resetBoard = () => {
    setGameState(initialGameState);
  };

  const resetScore = () => {
    setScores(initialScores);
    localStorage.clear();
  };

  // 칸을 클릭했을 때 함수
  const handleSquareClick = (event: any) => {
    // 칸 배열 번호(첫번째 칸은 0)
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));
    console.log(cellIndex);
    // 클릭한 칸의 값
    const currentValue = gameState[cellIndex];
    // 클릭한 칸의 값이 이미 있는 경우
    if (currentValue) {
      alert("둘 수 없는 칸입니다.");
      return;
    }

    // 게임판 상태를 기록하기 위해 배열 복사
    const historyState = [...gameState];
    // 기록 배열의 클릭한 인덱스에 현재 선수의 마커(X or O) 추가
    historyState[cellIndex] = currentPlayer;
    // 게임판 상태를 게임판 기록 배열의 상태로 업데이트
    setGameState(historyState);
  };

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl font-lobster mb-16 text-white">
        Tic Tac Toe Game
      </h1>
      <div>
        <div className="w-3/5 grid grid-cols-3 gap-4 mx-auto">
          {gameState.map((player, index) => (
            <Square
              key={index}
              {...{ player, index }}
              onClick={handleSquareClick}
            />
          ))}
        </div>

        <div className="mx-auto w-3/5 text-xl italic text-white">
          <div className="mt-5 md:flex-row flex flex-col">
            <p className="basis-3/5 mr-5 md:self-center font-semibold">
              Next Player:
              <span
                className={`${
                  currentPlayer === "X" ? "text-pink-300" : "text-yellow-300"
                } font-lobster ml-3`}
              >
                {currentPlayer}
              </span>
            </p>
          </div>
          <p className="mt-5 mr-5">
            Player <span className="font-lobster text-yellow-300 mr-1">O</span>{" "}
            wins:
            <span className="font-bold ml-3 font-lobster">{scores["O"]}</span>
          </p>
          <p className="mt-5 mr-5">
            Player <span className="font-lobster text-pink-300 mr-1">X</span>{" "}
            wins:
            <span className="font-bold ml-3 font-lobster">{scores["X"]}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Game;
