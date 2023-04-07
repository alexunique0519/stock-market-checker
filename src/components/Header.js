import Search from "./Search"


const Header = ({name}) => 
<>
<div className="xl:px-32">
        <h1 className="text-5xl">{name}</h1>
        <Search />
      </div>
</>
export default Header