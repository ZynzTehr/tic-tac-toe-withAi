import React, { useState, useEffect } from "react";
import Board from "./Board";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import Button from "./ui/Button";
import { Select, Option } from "./ui/Select";
import { calculateWinner, getAIMove } from "../lib/ai";

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('cpu'); // 'local' or 'cpu'
  const [aiPlays, setAiPlays] = useState('O'); // CPU plays X or O
  const [difficulty, setDifficulty] = useState('hard');

  const squares = history[step];
  const result = calculateWinner(squares);

  useEffect(()=>{
    if(mode!=='cpu' || result) return;
    const current = xIsNext ? 'X' : 'O';
    if(current !== aiPlays) return;
    const id = setTimeout(()=>{
      const idx = getAIMove(squares, current, difficulty);
      if(typeof idx === 'number'){
        handlePlay(idx);
      }
    }, 300);
    return ()=>clearTimeout(id);
  }, [mode, aiPlays, difficulty, xIsNext, squares, result]);

  function handlePlay(i){
    if(squares[i] || result) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    const newHistory = history.slice(0, step+1).concat([next]);
    setHistory(newHistory);
    setStep(newHistory.length-1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(m){
    setStep(m);
    setXIsNext(m % 2 === 0);
  }
  function reset(){
    setHistory([Array(9).fill(null)]);
    setStep(0);
    setXIsNext(true);
  }
  function undo(){ if(step>0) jumpTo(step-1); }
  function redo(){ if(step < history.length-1) jumpTo(step+1); }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="container grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tic Tac Toe</CardTitle>
            <div className="text-sm text-gray-500">Mode: {mode.toUpperCase()} • Difficulty: {difficulty}</div>
          </CardHeader>
          <CardContent>
            <Board squares={squares} onPlay={handlePlay} winningLine={result?.line} />
            <div className="mt-4 p-3 border rounded">{ result ? (result.winner ? `Winner: ${result.winner}` : 'Draw') : `Next: ${xIsNext ? 'X' : 'O'}` }</div>
            <div className="flex gap-2 mt-3">
              <Button onClick={reset}>Reset</Button>
              <Button variant="outline" onClick={undo}>Undo</Button>
              <Button variant="outline" onClick={redo}>Redo</Button>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium">History</div>
              <ol className="list-decimal ml-5 max-h-40 overflow-auto">
                {history.map((_,m)=>(
                  <li key={m}><button className={"underline text-sm " + (m===step ? "font-semibold":"text-gray-700")} onClick={()=>jumpTo(m)}>{m===0 ? "Go to start" : `Go to move #${m}`}</button></li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
          <CardContent>
            <div className="mb-3">
              <div className="text-sm font-medium">Mode</div>
              <label className="flex items-center gap-2"><input type="radio" checked={mode==='local'} onChange={()=>setMode('local')} /> <span>Local (2 players)</span></label>
              <label className="flex items-center gap-2"><input type="radio" checked={mode==='cpu'} onChange={()=>setMode('cpu')} /> <span>Play vs CPU</span></label>
            </div>

            {mode==='cpu' && (
              <>
                <div className="mb-3">
                  <div className="text-sm font-medium">CPU plays</div>
                  <label className="flex items-center gap-2"><input type="radio" checked={aiPlays==='O'} onChange={()=>setAiPlays('O')} /> <span>O (goes second)</span></label>
                  <label className="flex items-center gap-2"><input type="radio" checked={aiPlays==='X'} onChange={()=>setAiPlays('X')} /> <span>X (goes first)</span></label>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium">Difficulty</div>
                  <Select value={difficulty} onChange={setDifficulty}>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                  </Select>
                </div>
              </>
            )}

            <div className="mt-4 text-sm text-gray-600">Tip: Switch to Local for player vs player, or CPU to play vs machine.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
