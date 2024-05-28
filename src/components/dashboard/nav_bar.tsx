// Barra de Search

const SearchBar = () => {
    return (
      <>
        <nav className="flex justify-between items-center px-4 py-2" style={{ backgroundColor: '#0c4160ff',  fontFamily: 'Montserrat, sans-serif', color: 'black'}}>
          <div className="flex-grow">
            
            <input
              type="text"
              className="w-3/4 px-4 py-2 rounded-md"
              placeholder="Search..."    
            />

          </div>
          <div className="flex items-center"></div>
        </nav>
      </>
    );
  };
  
  export default SearchBar;