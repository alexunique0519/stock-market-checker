const ChartFilter = ({text, active, onClick}) => {
  const colors = active
    ? 'bg-indigo-600 border-indigo-700 text-gray-100'
    : 'border-indigo-300 text-indigo-300 border'

  
  return <button 
    onClick={onClick}
    className={`w-12 h-8 m-2 p-2 flex items-center justify-center cursor-pointer rounded-md ${colors} z-100` }
    >
      {text}
  </button>
}

export default ChartFilter