import { useState } from 'react'
import { InputBox } from './components'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  

  // these are states 
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)


  // using hook of currencyInfo
  const currencyInfo = useCurrencyInfo(from)


  // here we have stored currencyInfo key value is call via variable options(to list options for users like: inr, usd etc)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)

  }


  const convert = () => {
      setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
    className='w-full h-screen flex flex-wrap
    justify-center items-center bg-cover bg-no-repeat'
    style={{
      backgroundImage: `url('https://media.istockphoto.com/id/1152012284/photo/currency-symbols-on-floating-boxes.jpg?s=1024x1024&w=is&k=20&c=HGFIea331XG_gJDa8NxOzcsa29e3f_c3UBYc0BcOiKs=')`,
    }}

  >

    <div className='w-full'>
      <div className='w-full max-w-md mx-auto
      border border-grey-60 rounded-lg p-5
      backdrop-blur-sm bg-white/30'>
        <form 
             onSubmit={(e) => {
               e.preventDefault();
               convert()

             }}
        >
            <div className='w-full mb-1'>
              <InputBox 
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency)
                => setAmount(amount)}
              selectCurrency={from}
              />
            </div>
            <div className='relative w-full h-0.5'>
              <button
               type='button '
               className='absolute left-1/2
                -translate-x-1/2
                -translate-y-1/2 border-2
                border-white rounded-md 
                bg-blue-600 text-white px-2
                py-0.5'
                onClick={swap}
              >
                swap
                </button>
            </div>
            <div className='w-full mt-1 mb-4'>
              <InputBox label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency)
                => setTo(currency)}
                selectCurrency={from}
                amountDisable
              />
            </div>

            <button type='submit'
            className='w-full bg-blue-600
            text-white px-4 py-3 rounded-lg'>
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
        </form>
      </div>
  </div>
      
</div>
  );
}

export default App
