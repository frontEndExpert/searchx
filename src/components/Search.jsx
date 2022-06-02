import React, {useState, useEffect, useRef} from 'react'
import SearchResults from './SearchResults'
import Autocomplete from './Autocomplet'
import searches from '../fakeDB.json'

const MySearch = (props) => {

    const [searchList, setSearchList] = useState()
    const [searchTitle, setSearchTitle] = useState(null)
    const [searchAuto, setSearchAuto] = useState(null)
    const [search, setSearch] = useState(null)
    const [searchVisibility,setSearchVisibility] = useState('none')
    const [inList, setInList] = useState([])
    const searchRef = useRef()
    //const searchList = searches.searches
    
    useEffect(() => {
          //  refs.searchRef.getInputDOMNode().focus()
        if(!searchList){
            setSearchList([...searches.searches])
        }
    },[])

    useEffect(() => {
        // if(!searchList){
        //     setSearchList([...searches.searches])
        // }
    },[searchVisibility])

    const removeItem = (id) => {
        var listTemp =  []
        listTemp = inList.filter(item => parseInt(item.id) !== parseInt(id))
        setInList(listTemp)

    }

    const handleSearchChange = (event) => {
        event.preventDefault()
        var title = event.target.value
        setSearchAuto(title)
        setSearchTitle(title)
        setSearch(false)
    }
    
    const handleSearchEnter = (event) => {
        event.preventDefault()
        var title = event.target.value
        var id = searchList.filter( item => item.title === title).id
        var listTemp =  inList ? [...inList] : [];
        listTemp.push({id:id,searched:true})
        setInList(listTemp)

        setSearchTitle(title)
        setSearch(true)
        
    }

    const handleAutoChange = (id) => {
        var title = searchList ? searchList.find(item => item.id === id).title : ""
        
        searchRef.value=title
        if(!inList.includes(id)){
            var listTemp =  inList ? [...inList] : [];
            listTemp.push({id:id,searched:true})
            setInList(listTemp)
        }

        setSearchTitle(title)
        setSearch(true)
        setSearchAuto(title)
        setSearchVisibility("none")
    }

    const handleVisibility = (mode) => {
        setSearchVisibility(mode)
    }


    return <div className="searchx">
    <h3>SearchX</h3>
        <div className="searchHeader" 
        onMouseOver={()=> handleVisibility('block')}
        onMouseLeave={()=> handleVisibility('none')}  
        >
            <input type="search"  autoFocus
                className="searchinput" 
                id="search" 
                placeholder="Enter Your Search Term" 
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchEnter(e)}
                ref={searchRef}
                value={searchTitle || ""}
            />
            
            <div className="autocompletediv">
                <Autocomplete 
                        searchAuto={searchAuto} 
                        sellectItem={handleAutoChange} 
                        inList={inList}
                        removeItem={removeItem}
                />
            </div>
        </div>   
        <hr />
        <SearchResults searchQuery={searchTitle} search={search} />
    
        
        
        <style >{`

            .searchx {
                width: 100%;
            }
            .searchx > h3{
                font-weight: 100;
            }
            .searchx > .searchHeader {
                display: block;
                width: 500px;
                margin: 0px auto;
                border: 1px solid lightgrey;
                border-radius: 20px;
                box-shadow: 2px 2px #AAAAAA;
                padding: 6px 20px;
            }

            .searchinput {
                width: 100%;
                border: 0px solid white;
            }
            .autocompletediv {
                width: 100%;
                text-align: left;
                z-index: 10;
                display: ${searchVisibility};
            }

        `}</style>
    </div>
}

export default MySearch