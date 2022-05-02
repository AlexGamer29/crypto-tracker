import { createTheme, responsiveFontSizes  } from '@mui/material/styles';
import { makeStyles, ThemeProvider } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../../api/api';
import { CoinInfo, Header } from '../../components'
import { CryptoState } from '../../CryptoContext';

let darkTheme = createTheme();
darkTheme = responsiveFontSizes(darkTheme);

const useStyles = makeStyles((darkTheme) => ({
    container: {
        display: 'flex',
        [darkTheme.breakpoints.down("md")]: {
            flexDirection: 'column',
            alignItems: 'center',
        }
    },
    sidebar: {
        width: '30%',
        // [darkTheme.breakpoints.down("md")]: {
        //     width: "100%",
        // },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
        borderRight: '2px solid grey',
    },
}))

const Coin = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [coin, setCoin] = useState()

    const { currency, symbol } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data)
    }
    console.log(coin);

    useEffect(() => {
        fetchCoin()
    }, [])



    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <div className={classes.container}>
                    <Header />
                    <div className={classes.sidebar}>
                        Sidebar
                    </div>

                    <CoinInfo coin={coin} />
                </div>

            </ThemeProvider>
        </>
    )
}

export default Coin