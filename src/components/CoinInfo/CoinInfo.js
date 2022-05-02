import { useState } from "react"
import React from 'react'
import { CryptoState } from "../../CryptoContext"
import axios from "axios"
import { HistoricalChart } from "../../api/api"

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)

  const { currency } = CryptoState();
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setHistoricalData(data.prices)
  }

  useState(() => {
    fetchHistoricalData()
  }, [currency, days])
  

  return (
    <div>CoinInfo</div>
  )
}

export default CoinInfo