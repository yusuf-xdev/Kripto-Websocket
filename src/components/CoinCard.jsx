import React from 'react';
import './CoinCard.css';

const CoinCard = ({ coinData }) => {
    if (!coinData) {
        return (
            <div className="coin-card loading">
                <div className="coin-symbol">---</div>
                <div className="coin-price">Yükleniyor...</div>
                <div className="coin-change">
                    <span className="change-arrow">→</span>
                    <span className="change-percent">--%</span>
                </div>
            </div>
        );
    }

    const { symbol, price, change, priceChange, lastPrice } = coinData;


    const getPriceDirection = () => {
        if (priceChange > 0) return 'up';
        if (priceChange < 0) return 'down';
        return 'stable';
    };

    const direction = getPriceDirection();


    const getArrow = () => {
        switch (direction) {
            case 'up': return '↗';
            case 'down': return '↘';
            default: return '→';
        }
    };


    const getCurrency = () => {
        if (symbol.includes('TRY')) {
            return '₺';
        }
        return '$';
    };
    const formatPrice = (price) => {
        if (price >= 1) {
            return price.toFixed(2);
        }
        return price.toFixed(6);
    };


    const formatPercent = (percent) => {
        return Math.abs(percent).toFixed(2);
    };

    return (
        <div className={`coin-card ${direction}`}>
            <div className="coin-symbol">{symbol}</div>
            <div className="coin-price">
                {getCurrency()}{formatPrice(price)}
            </div>
            <div className="coin-change">
                <span className="change-arrow">{getArrow()}</span>
                <span className="change-percent">
                    {change >= 0 ? '+' : ''}{formatPercent(change)}%
                </span>
            </div>
            <div className="price-change">
                {priceChange >= 0 ? '+' : ''}{getCurrency()}{Math.abs(priceChange).toFixed(6)}
            </div>
        </div>
    );
};

export default CoinCard;
