import { useState } from "react"
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import SearchResults from "./SearchResults"
import { searchSymbol } from "../api/stock-api"

const Search = () => {
  const [input, setInput] = useState('')
  const [bestMatch, setBestMatches] = useState([])

  const clear = () => {
    setInput('')
    setBestMatches([])
  }

  

  const updateBestMatches = async () => {
    try {
      if(input) {
        const result = await searchSymbol(input)
        setBestMatches(result.result)
      
      }
    } catch (error) {
      setBestMatches([])
      console.log(`updateBestMatches got error: ${error}`)
    }
  }

  return (
      <div className="flex itemsS-center my-4 border-2 rounded-md 
        relative z-50 w-96 bg-white border-neutral-2">
          <input 
            type='text'
            value={input}
            className='w-full px-4 py-2 focus:outline-none rounded-md'
            placeholder="Search stock"  
            onChange={(e) => (
              setInput(e.target.value)
            )}
            onKeyPress={e => (
              e.key === 'Enter' && updateBestMatches()
            )}
          />

          {input && <button onClick={clear}>
              <XMarkIcon className='h-4 w-4 fill-gray-500' />
          </button>}
          
          <button onClick={updateBestMatches} className="bg-violet-300 h-8 w-8 rounded-md m-1 p-2">
              <MagnifyingGlassIcon className="h-4 w-4 fill-gray-200" />
          </button>
          { input && bestMatch.length > 0
            ? <SearchResults results={bestMatch} clearSearchResult={() => setBestMatches([])} />
            : ''
          }

      </div>
    )

}

export default Search