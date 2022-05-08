import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react'
import { useNavigate } from "react-router-dom"
import { CryptoState } from '../../CryptoContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState()

  console.log(currency)

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Typography
              onClick={() => navigate('/')}
              style={{
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              variant='h6'
            >
              Crypto Tracker
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                color: "gold",
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"VND"}>VND</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header