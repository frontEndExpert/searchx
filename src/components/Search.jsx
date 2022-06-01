import React, {useState, useEffect} from 'react'
import SearchResults from './SearchResults'
import Autocomplete from './Autocomplet'
import searches from '../fakeDB.json'

const MySearch = (props) => {

    const [searchList, setSearchList] = useState()
    const [searchTitle, setSearchTitle] = useState(null)
    const [searchQuery, setSearchQuery] = useState()
    //const searchList = searches.searches
    
    useEffect(() => {
        if(!searchList){
            setSearchList([...searches.searches])
        }
    },[])

    useEffect(() => {
        // if(!searchList){
        //     setSearchList([...searches.searches])
        // }
    },[searchList])


    const handleSearchChange = (id) => {
        var title = searchList.find(item => item.id === id).title
        console.log("title",title)
        setSearchTitle(title)
    }


    

    return <div className="searchx">
    <h3>SearchX</h3>
        <div className="searchHeader" >
            <input type="search" className="searchinput" id="search" placeholder="Search" onChange={handleSearchChange} />
            <div className="autocompletediv">
                <Autocomplete searchTitle={searchTitle} sellectItem={handleSearchChange} />
            </div>
        </div>   
        <hr />
        <SearchResults searchQuery={searchTitle} />
    
        
        
        <style jsx>{`

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
                padding: 20px;
            }

            .searchinput {
                width: 100%;
                border: 0px solid white;
            }
            .autocompletediv {
                width: 100%;
                text-align: left;
            }

        `}</style>
    </div>
}

export default MySearch