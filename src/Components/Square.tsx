interface Props {
  player?: string;
  index: number;
  onClick: (event: any) => void;
  //   onClick(): void;
}

const Square = ({ player, index, onClick }: Props) => {
  const hoverStyle = "transition duration-500 hover:scale-105 transform";
  const textColor = player === "X" ? "text-pink-300" : "text-yellow-300";
  //   const scale = player ? "scale-100" : "scale-0";
  //   const spanadd = "transform transition-all duration-150 ease-out";

  return (
    <div
      data-cell-index={index}
      className={`h-36 border-solid border-4 border-slate-200 font-lobster flex justify-center items-center cursor-pointer md:text-7xl text-5xl text-center ${hoverStyle}`}
      {...{ onClick }}
      //   onClick={onClick}
    >
      <span className={`${textColor}`} data-cell-index={index}>
        {player}
      </span>
    </div>
  );
};

export default Square;
