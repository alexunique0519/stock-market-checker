export const searchSymbol = async (qs) => {
  const url = `${process.env.REACT_APP_API_PATH}/search?q=${qs}&token=${process.env.REACT_APP_API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(res.status)
  }

  return await res.json()
}

export const fetchStockDetails = async (stockSymbol) => {
  const url = `${process.env.REACT_APP_API_PATH}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(res.status)
  }

  return await res.json()
}

export const fetchQuote = async (stockSymbol) => {
  const url = `${process.env.REACT_APP_API_PATH}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(res.status)
  }

  return await res.json()
}

export const fetchHistoricalData = async (stockSymbol, resolution, from, to) => {
  const url = `${process.env.REACT_APP_API_PATH}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_API_KEY}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(res.status)
  }

  return await res.json()
}