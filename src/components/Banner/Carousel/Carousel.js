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
    }
}));

const Carousel = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);

    const classes = useStyles();

    const { currency } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrendingCoins(data);
    }

    console.log(trendingCoins);

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency])

    const items = trendingCoins.map((coin) => {
        return (
            <Link
                className={classes.carousel}
                to={`/coin/${coin.id}`}
            >
                <img src={coin?.image} alt={coin.name} height="80"
                    style={{
                        marginBottom: 10,
                    }} />
            </Link>

            // <div key={coin.id}>
            //     <img src={coin.image} alt={coin.name} />
            //     <p>{coin.name}</p>
            // </div>
        )
    })

    const responsive = {
        0: { items: 2 },
        512: { items: 4 },
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