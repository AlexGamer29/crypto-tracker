import { useEffect, useState } from "react"
import React from 'react'
import { CryptoState } from "../../CryptoContext"
import axios from "axios"
import { HistoricalChart } from "../../api/api"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles"
import { CircularProgress } from "@mui/material"
import { chartDays } from "../../api/data";
import SelectButton from "../SelectButton/SelectButton"
import { Line } from "react-chartjs-2"
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const useStyles = makeStyles((darkTheme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [darkTheme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}))

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const classes = useStyles()



  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setFlag(true)
    setHistoricalData(data.prices)
  }

  useEffect(() => {
    fetchHistoricalData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days])

  // console.log("data", historicalData);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData | flag === false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                  line: {
                    borderWidth: 1,
                    // tension: 0
                  },
                },
                // events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
                interaction: {
                  intersect: false,
                  mode: 'index',
                },
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      drag: {
                        enabled: false,
                      },
                      pinch: {
                        enabled: true
                      },
                      mode: 'x',
                    },
                    pan: {
                      enabled: true,
                    },
                    mode: 'xy'
                  }
                },
                tooltips: {
                  mode: 'index',
                  intersect: false,
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo