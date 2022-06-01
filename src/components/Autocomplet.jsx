import React,{useState, useEffect} from 'react'
import searches from '../fakeDB.json'

//import { library } from '@fortawesome/fontawesome-svg-core'
//import {clock} from '@fortawesome/react-fontawesome/'
//import {search} from '@fortawesome/react-fontawesome/'
//import { faSearch, fa-clock-nine} from '@fortawesome/free-solid-svg-icons'
// library.add(
//     faSearch,
//     faClock
// )
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Autocomplete = (props) => {
    const [inList, setInList] = useState(false)
    const searchList = searches.searches

    function convertUnicode(input) {
        return input.replace(/\\u[0-9a-fA-F]{4}/g,function(a,b) {
          var charcode = parseInt(b,16);
          return String.fromCharCode(charcode);
        });
      }
    
    

//<FontAwesomeIcon icon={faSearch} />"\u2315"
/*
            .icn-search:after { 
                -webkit-transform: rotate(45deg); 				
                -moz-transform: rotate(45deg); 				
                -o-transform: rotate(45deg); 				
                transform: rotate(45deg); 				
                display: block; 				
                content: ${convertUnicode("\u23F2")}; 			
            } */
    return (
    <>
        <div className="autocomplete">{convertUnicode("\ue67b")}
        {  searchList.map( (item) => 
            <div className="searchRow" key={item.id} onClick={() => props.sellectItem(item.id)} >
                <span >{!inList ? 	"\u23F2" :  "\uE67C"  } </span>
                <span>{item.title}</span>
                {  <span className='ssss' />}
            </div>      
        )} 
        </div>
        <style jsx>{` 
        
            .autocomplete{
                display: flex;
                flex-flow: column wrap;
                font-size: 18px;
                font-weight: normal;

            }

            .searchRow:hover {
                cursor: pointer;
                font-weight: 500;
            }


        `}</style>
    </>
    )
}


export default Autocomplete