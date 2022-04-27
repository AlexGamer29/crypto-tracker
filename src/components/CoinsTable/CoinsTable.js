import { Container, TextField, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CoinList } from '../../api/api'
import { CryptoState } from '../../CryptoContext'

const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState(false)

    const { currency } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));

        setCoins(data)
        setLoading(false)
    }

    console.log(coins);

    useEffect(() => {
        fetchCoins()
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        }
    });


    return (
       <ThemeProvider theme={darkTheme}>
           <Container style={{textAlign: "center"}}>
                <Typography
                variant='h4'
                style={{margin: 18, fontFamily: "Montserrat", fontSize: "2rem", fontWeight: 600}}>
                    Cryptocurrency prices by Market Cap
                </Typography>
                <TextField label="Search for cryptocurrency"
                variant='outlined'
                style={{ marginBottom: 20, width: "100%"}}
                onChange={(e) => setSearch(e.target.value)} />
           </Container>
           </ThemeProvider>
    )
}

export default CoinsTable