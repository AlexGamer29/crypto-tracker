import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { TrendingCoins } from '../../../api/api';
import { CryptoState } from '../../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        fontFamily: "Montserrat",
        textTransform: "uppercase",
        color: "white",
    }
}));

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);

    const classes = useStyles();

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrendingCoins(data);
    }

    // console.log(trendingCoins);

    useEffect(() => {
        fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const items = trendingCoins.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link
                className={classes.carouselItem}
                to={`/coins/${coin.id}`}>


                <img src={coin?.image} alt={coin.name} height="80"
                    style={{ marginBottom: 10 }}
                />
                <span style={{
                    marginTop: 5,
                    fontWeight: 500,
                }}>
                    {coin?.symbol}
                    &nbsp;
                    &nbsp;
                    <span style={{
                        color: profit > 0 ? "rgb(22, 199, 132)" : "rgb(234, 57, 67)",
                    }}>
                        {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>

                <span style={{ fontSize: "1em", fontWeight: 700, marginTop: 10 }}>
                    {numberWithCommas(coin?.current_price?.toFixed(2))} {symbol}

                </span>
            </Link>
        )
    })

    const responsive = {
        0: { items: 2 },
        512: { items: 3 },
    }

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={800}
                animationDuration={1000}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}>

            </AliceCarousel>
        </div>
    )
}

export default Carousel