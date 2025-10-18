import React from "react";

function Square({ handleClick, value }) {
  return (
    <button className='w-full aspect-square bg-white text-black text-xl font-bold rounded-xl' onClick={handleClick}>
      {value}
    </button>
  );
}

export default Square;
