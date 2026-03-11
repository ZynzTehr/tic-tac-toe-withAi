export const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

export function calculateWinner(squares){
  for(const [a,b,c] of LINES){
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return { winner: squares[a], line: [a,b,c] };
    }
  }
  if(squares.every(Boolean)) return { winner: null, line: [] };
  return null;
}

export function easyMove(squares){
  const empty = squares.map((v,i)=>v?null:i).filter(v=>v!==null);
  return empty[Math.floor(Math.random()*empty.length)];
}

// Medium: try to win, then block, center, random
export function mediumMove(squares, player){
  for(let i=0;i<9;i++){
    if(!squares[i]){
      const t = squares.slice(); t[i]=player;
      if(calculateWinner(t)?.winner===player) return i;
    }
  }
  const opp = player==="X"?"O":"X";
  for(let i=0;i<9;i++){
    if(!squares[i]){
      const t = squares.slice(); t[i]=opp;
      if(calculateWinner(t)?.winner===opp) return i;
    }
  }
  if(!squares[4]) return 4;
  return easyMove(squares);
}

// Minimax for hard (unbeatable). Returns index best for player
export function minimaxMove(squares, player){
  function minimax(board, current){
    const res = calculateWinner(board);
    if(res){
      if(res.winner==="X") return {score: 10};
      if(res.winner==="O") return {score: -10};
      return {score: 0};
    }
    const moves = [];
    for(let i=0;i<9;i++){
      if(!board[i]){
        const nb = board.slice(); nb[i]=current;
        const next = minimax(nb, current==="X"?"O":"X");
        moves.push({index:i, score: next.score});
      }
    }
    if(current==="X"){
      let best = moves[0];
      for(const m of moves) if(m.score>best.score) best=m;
      return best;
    } else {
      let best = moves[0];
      for(const m of moves) if(m.score<best.score) best=m;
      return best;
    }
  }
  const playerIsX = player==="X";
  const res = minimax(squares, player);
  return res.index;
}

export function getAIMove(squares, player, difficulty="hard"){
  if(difficulty==="easy") return easyMove(squares);
  if(difficulty==="medium") return mediumMove(squares, player);
  return minimaxMove(squares, player);
}
