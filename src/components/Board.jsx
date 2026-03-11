import React from "react";

export default function Board({ squares, onPlay, winningLine }){
  return (
    <div className="grid grid-cols-3 gap-3">
      {squares.map((v,i)=>(
        <button
          key={i}
          onClick={()=>onPlay(i)}
          className={"w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center text-3xl font-bold " + (winningLine?.includes(i) ? "bg-amber-300" : "bg-white shadow")}
        >
          {v}
        </button>
      ))}
    </div>
  );
}
