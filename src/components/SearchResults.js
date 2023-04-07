import { useContext } from "react"
import StockContext from "../context/StockContext"

const SearchResults = ({results, clearSearchResult}) => {
  const { setStockSymbol } = useContext(StockContext)
  
  return (
    <ul className="absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white border-neutral-200 custom-scrollbar ">
      {results.map((item, index) => {
        return <li key={index} 
                  className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200"
                  onClick={() => { setStockSymbol(item.symbol);  clearSearchResult() }}
                >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
      })}
    </ul>
  )
}

export default SearchResults