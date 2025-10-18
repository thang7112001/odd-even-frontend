import Square from "./Square"

export default function Board({ squares, handleClick }) {

  const squareComponents = squares.map(
    (square, index) => (<Square key={index} handleClick={() => handleClick(index)} value={square}/>)
  );
  return (
    <div className="relative grid grid-cols-5 gap-2 sm:gap-4 w-full">
      {squareComponents}
    </div>
  );
}