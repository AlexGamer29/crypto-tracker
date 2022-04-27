import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useNavigate } from "react-router-dom"
import { CryptoState } from '../../CryptoContext';


const typoStyles = makeStyles((darkTheme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const selectStyles = makeStyles((darkTheme) => ({
  select: {
    "&:before": {
      borderColor: "red"
    },
    "&:after": {
      borderColor: "blue"
    },
  }
}
))



const Header = () => {

  const typo = typoStyles();
  const select = selectStyles();

  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState()

  console.log(currency)

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
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate('/')}
              className={typo.title}
              variant='h6'
            >
              Crypto Tracker
              <Select
                variant="outlined"
                className={select.select}
                style={{
                  width: 100,
                  height: 40,
                  marginLeft: 15,
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"VND"}>VND</MenuItem>
              </Select>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header