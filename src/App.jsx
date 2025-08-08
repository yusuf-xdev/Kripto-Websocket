import React from 'react';
import useBinanceWebSocket from './hooks/useBinanceWebSocket';
import CoinCard from './components/CoinCard';
import './App.css';

function App() {
  const symbols = ['DOGEUSDT', 'BTCUSDT', 'BTCTRY', 'ETHUSDT', 'DOGETRY'];
  const { cryptoData, isConnected } = useBinanceWebSocket(symbols);

  return (
    <div className="app">
      <header className="app-header">
        <h1> Kripto Para Takip</h1>
        <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
          <span className="status-dot"></span>
          {isConnected ? 'Bağlı' : 'Bağlantı Kuruluyor...'}
        </div>
      </header>

      <main className="crypto-grid">
        {symbols.map((symbol) => (
          <CoinCard
            key={symbol}
            coinData={cryptoData[symbol]}
          />
        ))}
      </main>

      <footer className="app-footer">
        <p>Binance WebSocket API kullanılarak anlık veriler çekilmektedir.</p>
      </footer>
    </div>
  );
}

export default App;
