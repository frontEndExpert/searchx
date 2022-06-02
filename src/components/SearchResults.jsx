import React,{useState, useEffect} from 'react'



const SearchResults = (props) => {
    const [results, setResults] = useState();
    const [totalResults, setTotalResults] = useState();
    const [formattedSearchTime, setFormattedSearchTime] = useState();
    const [pageNum, setPageNum] = useState(0);


    useEffect( () => {
        if(results){
            setTotalResults(results.searchInformation.formattedTotalResults)
        }
        if(results){
            setFormattedSearchTime(results.searchInformation.formattedSearchTime)
        }
    },[results])

    useEffect(() => {
        if(props.searchQuery!=null && props.search){
            getGoogleSearchResults(props.searchQuery, pageNum)
        }
    },[props.searchQuery, props.search, pageNum])

    async function getGoogleSearchResults(q,page) {
        // Get the API key from Google's developer console
        // Get the CSE ID from google.com/cse
        const CSE="b983ee7dc7314863b";
        const KEY="AIzaSyBBnIdyegidawwjb71L3CN-9SVqRh01PMA";
        
    
        var apiUrl = 'https://www.googleapis.com/customsearch/v1?key=' + KEY + '&cx=' + CSE + '&q=' + encodeURIComponent(q) + '&start=' + page + '&num=10';
        await fetch(apiUrl, {
                muteHttpExceptions: true,
              })
            .then((response) => {
            return response.json()
            })
            .then((data) => {
                setResults(data)
                return data
            })
            .catch((err) => {
                console.log("Error fetching", err)
            })
      
    }


    const nextPage = () => {
        if(pageNum<results.searchInformation.totalResults-10){
            setPageNum(pageNum + 10)
        }
    }
    
    const prevPage = () => {
        if(pageNum>=10){
            setPageNum(pageNum - 10)
        }
    }
    
    return <div className="searchResults">
     {results &&    <p>found {totalResults} results, ({formattedSearchTime} seconds)
        </p> }
    {results && results.items.map(item => <div className="resultRow" key={item.cacheId}>
            <a className="title" href={item.link }>{item.title}</a>
            <span>{item.snippet}</span>
        </div>
        )}
    { results && 
    <div className="paginations">
        <div className={parseInt(pageNum)>=10 ? "prevPage" : "prevPage disabled" } onClick={prevPage} >PreviousPage</div>
        <div className={parseInt(pageNum)===parseInt(totalResults) ? "nextPage disabled" : "nextPage"}  onClick={nextPage} >NextPage</div>
    </div> }
    <style >{`
    .searchResults {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        font-size: 18px;
        padding: 20px;
    }
    .resultRow {
        text-align: left;
        display: flex;
        flex-flow: column wrap;
    }
    .resultRow > span{
        font-size: 14px;
    }
    .title {
        font-size: 20px;
        font-weight: 600;
        text-decoration: none;

    }
    .nextPage:hover {
        cursor: pointer;
        color: black;
    }
    .prevPage:hover {
        cursor: pointer;
        color: black;
    }
    .nextPage.disabled:hover{
        cursor:not-allowed;
        color: #888888;
    }
    .prevPage.disabled:hover{
        cursor:not-allowed;
        color: #888888;
    }
    .paginations{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        width: 70%;
        margin-top: 20px;
        align-self: center;
    }

    `}</style>
    </div>

}

export default SearchResults