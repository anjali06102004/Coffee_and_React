import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumallowed] = useState(false);
  const [charALlowed, setCharallowed] = useState(false);
  const[password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

   const [passwordHistory, setPasswordHistory] = useState(() => {
    //initialize from local storage
    const stored = localStorage.getItem('passwordHistory');
    return stored ? JSON.parse(stored): [];
  });

  const passwordGenerator = useCallback(() =>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charALlowed) str += "!@#$%^&*()_+={}[]~`"

    for (let i =1; i< length; i++){
      let char = Math.floor(Math.random() * str.length + 1 )
      pass += str.charAt(char)
    }

    setPassword(pass)

    //update password history
    const updatedHistory = [pass, ...passwordHistory].slice(0,10);//to keep last 10 passwords
    setPasswordHistory(updatedHistory);
     try {
    localStorage.setItem("passwordHistory", JSON.stringify(updatedHistory));
  } catch (e) {
    console.error("LocalStorage stringify error:", e);
  }

}, [length, numAllowed, charALlowed, passwordHistory])

  const cpoyPasswordToClipboard = useCallback(() => {
     passwordRef.current?.select();
     passwordRef.current?.setSelectionRange(0, 100);
     window.navigator.clipboard.writeText(password)
  },
[password])




 


  return (
    <>
         <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  text-orange-500 bg-gray-700">
          <h1 className='text-white text-center my-3 py-3 '>Password Generator</h1>

          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text" 
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
            />

          

            <button 
            onClick={cpoyPasswordToClipboard}
            className='outline-none bg-blue-700 hover:bg-blue-900 text-white px-3 py-0.5 shrink-0'>
              copy
            </button>
          </div>
           <div className='flex text-sm gap-x-2' >
             <div className='flex items-center gap-x-1'>
               <input type="range"
               min={6}
               max={100}
               value={length}
               className='cursor-pointer'
               onChange={(e) => {setLength(e.target.value)}}
               />
               <label>Length: {length}</label>
             </div>
             <div className='flex items-center gap-x-1'>
               <input 
               type="checkbox"
               defaultChecked={numAllowed}
               id='numberInput'
               onChange={() => { 
                setNumallowed((prev) => !prev)
               }} 

               />

               <label htmlFor="numberInput">Numbers</label>
             </div>

             <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={charALlowed}
              id='characterInput'
              onChange={() => {
                setCharallowed((prev) => !prev)
              }} 
              />
              <label htmlFor="characterInput">Characters</label>
             </div>

             
           </div>

            <button
            onClick={passwordGenerator}
            className="outline-none bg-green-600 hover:bg-green-700 text-white  px-1 py-0.5 mt-2 mb-2 shrink-0 rounded"
             >
               Generate Password
            </button>

        {passwordHistory.length > 0 && (
        <div className="w-full  mx-auto text-white bg-gray-800 rounded-lg p-4 mt-4 mb-5">
               <h3 className="text-orange-400 font-semibold mb-2">Password History</h3>
               <ul className="text-sm list-disc pl-5 break-words">
                     {passwordHistory.map((pwd, idx) => (
                        <li key={idx} className='break-all'>{pwd}</li>
                      ))}
               </ul>
              <button
               onClick={() => {
                  setPasswordHistory([]);
                    localStorage.removeItem("passwordHistory");
                 }}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded"
             >
                Clear History
              </button>
        </div>
      )}

      <div className='h-3 text-xs mb-6'>@Created by Anjali</div>

         </div>
    </>
  )
}

export default App
