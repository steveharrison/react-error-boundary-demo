import React, { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

async function getPrice():Promise<number> {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');

  // throw new Error("This won't be caught by the ErrorBoundary.");

  const responseJSON = await response.json();

  return responseJSON.bitcoin.usd;
}

function Hero() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const bitcoinPrice = await getPrice();
      setPrice(bitcoinPrice);
    })();
  });

  throw new Error('This will be caught by the ErrorBoundary.');

  return (
    <>
      <h2>Bitcoin price:</h2>
      <div>{price}</div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Hero/>
      </ErrorBoundary>
    </div>
  );
}

export default App;
