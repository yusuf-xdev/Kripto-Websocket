import { useState, useEffect, useRef } from 'react';

const useBinanceWebSocket = (symbols) => {
    const [cryptoData, setCryptoData] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    useEffect(() => {
        const connectWebSocket = () => {
            try {
                const streams = symbols.map(symbol => `${symbol.toLowerCase()}@ticker`).join('/');
                const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;

                wsRef.current = new WebSocket(wsUrl);

                wsRef.current.onopen = () => {
                    console.log('Binance WebSocket bağlantısı kuruldu');
                    setIsConnected(true);
                };

                wsRef.current.onmessage = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        if (message.data) {
                            const data = message.data;
                            setCryptoData(prev => ({
                                ...prev,
                                [data.s]: {
                                    symbol: data.s,
                                    price: parseFloat(data.c),
                                    change: parseFloat(data.P),
                                    priceChange: parseFloat(data.p),
                                    lastPrice: prev[data.s]?.price || parseFloat(data.c)
                                }
                            }));
                        }
                    } catch (error) {
                        console.error('WebSocket mesaj parse hatası:', error);
                    }
                };

                wsRef.current.onclose = (event) => {
                    console.log('WebSocket bağlantısı kapandı:', event.code);
                    setIsConnected(false);

                    if (event.code !== 1000) {
                        reconnectTimeoutRef.current = setTimeout(() => {
                            connectWebSocket();
                        }, 3000);
                    }
                };

                wsRef.current.onerror = (error) => {
                    console.error('WebSocket hatası:', error);
                    setIsConnected(false);
                };

            } catch (error) {
                console.error('WebSocket bağlantı hatası:', error);
                setIsConnected(false);
            }
        };

        connectWebSocket();

        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (wsRef.current) {
                wsRef.current.close(1000);
            }
        };
    }, [symbols]);

    return { cryptoData, isConnected };
};

export default useBinanceWebSocket;
