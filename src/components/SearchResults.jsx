import React,{useState, useEffect} from 'react'


async function getGoogleSearchResults(q) {
    // Get the API key from Google's developer console
    // Get the CSE ID from google.com/cse

    console.log( "encodeURIComponent(q)" ,encodeURIComponent(q))
    var apiUrl = 'https://www.googleapis.com/customsearch/v1?key=' + KEY + '&cx=' + CSE + '&q=' + encodeURIComponent(q);
    await fetch(apiUrl, {
            muteHttpExceptions: true,
          })
        .then((response) => {
        return response.json()
        })
        .then((data) => {
            console.log("data:",data);
            return data
        })
        .catch((err) => {
            console.log("Error fetching", err)
        })
  
}

const SearchResults = (props) => {
    const [results, setResults] = useState();


    useEffect( () => {

        var resultsArr = getGoogleSearchResults(props.searchQuery)
        console.log("resultsArr:", resultsArr)
        setResults(resultsArr ? [...resultsArr]: null)
    },[props.searchQuery])



    console.log("results", results);

    return <div className="searchResults">
        <p>{/* results.searchInformation?.totalResults */}</p>
    {results && results.items.map(item => <div className="resultRow">
            <a className="title" href={item.link }>{item.title}</a>
            <span>{item.snippet}</span>
        </div>
        )}
    
    <style jsx>{`
    .searchResults {
        display: flex;
        flex-flow: column wrap;
        font-size: 18px;
    }
    .resultRow {
        text-align: left;
    }

    `}</style>
    </div>

}

export default SearchResults