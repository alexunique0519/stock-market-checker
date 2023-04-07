const Card = ({children}) => {
  return (<div className="w-full h-full rounded-md relative p-8 border-2 bg-white">
    {children}
    </div>
  )
}

export default Card