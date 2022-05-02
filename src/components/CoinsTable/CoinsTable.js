import { Container, LinearProgress, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Pagination, PaginationItem, Stack } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { makeStyles } from "@mui/styles"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../../api/api'
import { CryptoState } from '../../CryptoContext'
import { numberWithCommas } from '../Banner/Carousel/Carousel';

const useStyles = makeStyles((darkTheme) => ({
    row: {
        backgroundColor: "#16171a",
        cursor: "cursor",
        "&:hover": {
            backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color: "gold",
        },
    },
    left: {
        width: "50%",
    },
    right: {
        width: "50%",
    }
}))

const CoinsTable = () => {
    const classes = useStyles();

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    const { currency, symbol } = CryptoState();

    const navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));

        setCoins(data)
        setLoading(false)
    }

    // console.log(coins);

    useEffect(() => {
        fetchCoins()
    }, [currency])

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        )
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: "Montserrat", fontSize: "2rem", fontWeight: 600 }}>
                    Cryptocurrency prices by Market Cap
                </Typography>
                <TextField label="Search for cryptocurrency"
                    variant='outlined'
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)} />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress
                                style={{
                                    backgroundColor: "gold"
                                }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "inherit",
                                                    fontSize: "1em",
                                                    textAlign: "left",
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {handleSearch()
                                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;

                                            return (
                                                <TableRow
                                                    onClick={() => navigate(`/coins/${row.id}`)}
                                                    className={classes.row}
                                                    key={row.name}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 15 }}
                                                    >
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />
                                                        <div
                                                            style={{ display: "flex", flexDirection: "column" }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: "1em",
                                                                    fontFamily: "inherit",
                                                                    fontWeight: 600,
                                                                    color: "white"
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey", fontFamily: "inherit", fontWeight: 400 }}>{row.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align='left' style={{ color: "white" }}>
                                                        {symbol}{" "}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell align='left'
                                                        style={{
                                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                            fontWeight: 500,
                                                        }}>
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align='left' style={{ color: "white" }}>
                                                        {symbol}{" "}
                                                        {numberWithCommas(
                                                            row.market_cap.toString().slice(0, -6)
                                                        )}
                                                        M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>

                        )
                    }
                </TableContainer>

                {/* <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                    classes={{ ul: classes.pagination }}
                    components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                /> */}
                <Stack spacing={2}>
                    <Pagination
                        style={{
                            padding: 20,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}
                        classes={{ ul: classes.pagination }}
                        count={(handleSearch()?.length / 10).toFixed(0)}
                        onChange={(_, value) => {
                            setPage(value)
                            window.scrollTo(0, 450)
                        }}
                        renderItem={(item) => (
                            <PaginationItem
                                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...item}
                            />
                        )}
                    />
                </Stack>

            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable