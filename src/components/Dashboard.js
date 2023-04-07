import Header from "./Header"
import Details from "./Details"
import Overview from "./Overview"
import Chart from "./Chart"
import { useContext, useEffect, useState } from "react"
import StockContext from "../context/StockContext"
import { fetchQuote, fetchStockDetails } from "../api/stock-api"

const Dashboard = () => {
  const {stockSymbol} = useContext(StockContext)
  const [stockDetails, setStockDetails] = useState({})
  const [quote, setQuote] = useState({})
  
  const getStockDetails = async () => {
    try {

      console.log('stockSymbol', stockSymbol)
      const details =  await fetchStockDetails(stockSymbol);
      console.log('details', details)
      setStockDetails(details)        
    } catch (error) {
      setStockDetails({})
      console.log(error)
    }
  }

  const getQuote =  async () => {
    try {
      const quote =  await fetchQuote(stockSymbol);
      setQuote(quote)        
    } catch (error) {
      setQuote({})
      console.log(error)
    } 
  }
 
  useEffect(() => {
    getStockDetails();
    getQuote()
  
  }, [stockSymbol])
  
  return (<div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3
    grid-rows-8 md:grid:rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-roboto bg-neutral-100">
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
       <Header name={stockDetails?.name} />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>
      <div >
        <Overview 
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails?.currency}
        />
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
  </div>
  )
}

export default Dashboard