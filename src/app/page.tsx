'use client'
import { useState } from "react"



export default function Home() {
  const buttons = ["AC", "( )", "%", "/", "7", "8", "9", "X", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "back","="]
  const operators = ['+', '-', 'X', '/','( )', '%',"="]
  // const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const [input, setInput] = useState<string>('');
  const [openParen, setOpenParen] = useState<boolean>(false);

  
  const handleClick = (btn: string) => {
    if (btn === "AC") {
      setInput("");
    } else if (btn === "back") {
      setInput((prev) => prev.slice(0, -1));
    } else if (btn === "=") {
      try {
        if (input === "" || operators.includes(input.slice(-1))) return;
        const expression = input.replace(/X/g, "*");
        setInput(eval(expression).toString());
      } catch {
        setInput("Error");
      }
    } else if (btn === "( )") {
      if (openParen || input === "" || operators.includes(input.slice(-1))) {
        setInput((prev) => prev + "(");
        setOpenParen(false);
      } else {
        setInput((prev) => prev + ")");
        setOpenParen(true);
      }
    } else {
      if (
        operators.includes(btn) &&
        (input === "" || operators.includes(input.slice(-1)))
      ) {
        return;
      }
      setInput((prev) => (prev === "Error" ? btn : prev + btn));
    }
  };

  return (
    <div className="w-screen flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-4">
      <h1 className="text-[2.5rem] font-sans p-4 font-bold">Simple Calculator</h1>
      <div className="bg-black p-6 rounded-xl shadow-lg opacity-85 relative top-[4rem]">
        <input
          type="text"
          value={input}
          className="w-full h-12 p-2 mb-7 border border-gray-300 rounded-lg text-right text-xl text-white bg-gray-600 "
          placeholder="0"
          readOnly
        />
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={()=> handleClick(btn)}
              className={`bg-gray-200 text-black p-4 rounded-lg text-lg font-semibold hover:bg-gray-600 ${operators.includes(btn)
 ? 'text-white bg-green-800' : ''} ${btn=== 'AC' ? 'bg-blue-600 text-black' : ''}` }
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
