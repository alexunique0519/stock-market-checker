import { fetchHistoricalData } from "../api/stock-api"
import { chartConfig } from "../constants/config"
import StockContext from "../context/StockContext"
import ChartFilter from "./ChartFilter"

const { useState, useEffect, useCallback, useContext } = require("react")
const { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } = require("recharts")
const { mockHistoricalData } = require("../constants/mockData")
const { convertDateToUnixTimestamp, convertUnitTimestampToDate, createDate } = require("../helper/dataHelper")
const { default: Card } = require("./Card")

const Chart = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('1W')

  const { stockSymbol } = useContext(StockContext)
  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnitTimestampToDate(data.t[index])
      }
    })
  }

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter]

      const endDate = new Date()
      const startDate = createDate(endDate, -days, -weeks, -months, -years)
      const startTimestampunix = convertDateToUnixTimestamp(startDate)
      const endTimestampunix = convertDateToUnixTimestamp(endDate)

      return {startTimestampunix, endTimestampunix}
    }

    const updateChartData = async () => {
      try {
        const { startTimestampunix, endTimestampunix} = getDateRange()
        const resolution = chartConfig[filter].resolution
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimestampunix,
          endTimestampunix
        )

        console.log('result', result)

        setData(formatData(result))

      } catch (error) {
        console.log(error)
      }
    }

    updateChartData()

  }, [stockSymbol, filter])


  return <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {
          Object.keys(chartConfig).map((config, index) => (
            <li key={index}>
              <ChartFilter
                text={config}
                active={filter === config}
                onClick={() => setFilter(config)} 
              />
            </li>
          ))
        }
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area 
            type='monotone' 
            dataKey="value"
            stroke="#312e83"
            fillOpacity={1}
            strokeWidth={1}
            fill="url(#chartColor)" />
          <Tooltip />
          <XAxis dataKey="date"  />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
  
    </Card>



}

export default Chart