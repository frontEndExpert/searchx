import React,{useState, useEffect} from 'react'
import searches from '../fakeDB.json'
import clock from '../images/clock-icon.png'
import search from '../images/search-icon.png'


const Autocomplete = (props) => {
    const [searchListFiltered, setSearchListFiltered] = useState(null)
    const searchList = searches.searches
    const searchTerm = props.searchAuto

    useEffect(() => {
        if(searchTerm){
            setSearchListFiltered(
                    searchList.filter(search => search.title.includes(searchTerm))
            )
        }
        
    },[searchTerm])

    
    return (
        <div className="autocomplete">
        { searchListFiltered && searchListFiltered.map( (item) => {
            var listItem = props.inList.filter( (list) => parseInt(list.id) === parseInt(item.id ))
        return (
            <div className="searchRow" key={item.id} >
                <img src={listItem[0] && listItem[0].searched ? 	clock :  search  }  alt={item.title} />
                <span onClick={() => props.sellectItem(item.id)}  >{item.title}</span>
                { listItem[0] && listItem[0].searched && <span className='remove' onClick={() => props.removeItem(item.id)}>remove</span>}
            </div>      
        )})} 

        <style >{` .autocomplete { display: flex;
                flex-flow: column wrap;
                font-size: 18px;
                font-weight: normal;
            }
            .searchRow > span:hover { cursor: pointer;
                background-color: #DDD
            }
            .searchRow > span { margin-left: 5px;
            }
            .remove { float: right;
                z-index: 22;
            }
        `}</style>
    </div>
    )
}


export default Autocomplete