import React, { useEffect, useState } from 'react'
import CartpageDetails from './CartpageDetails';
import axios from "axios"
import "./Cartpage.css"


const Cartpage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [record, setRecord] = useState("")
    const [page, setPage] = useState(1);

    useEffect(()=>{
        fetchData();
      },[page])

    const fetchData = async () => {
        setLoading(true);
        axios({
          method: 'get',
          url: "https://api.jikan.moe/v4/anime",
          params: {
            _page: page,
            _limit: 5,
            // rating_gte: filterRating,
          }
        })
        .then(res => { 
          setData(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          setError(true);
          setLoading(false);
        })
      }

      // searh item by title
      const searchRecord = () => {
        axios({
          method: 'get',
          url: `https://api.jikan.moe/v4/anime/?title=${record}`
        })
        .then(res => {   
          setData(res.data.data);
          setLoading(false);
        })
      }

    console.log("res", data)

    return (
        <div>
            {loading && <div>loading</div>}
            
            <div className='inputDiv'>
              <input onChange={(e) => setRecord(e.target.value)} placeholder='search any title'/>
              <button onClick={searchRecord}>search</button>
            </div>
            <div>

            {/* pagination */}
            <button disabled={page===1} onClick={() => setPage(page - 1)}>prev</button>
            <button onClick={() => setPage(page + 1)}>next</button>
            <PaginationComponent currentPage={page} lastPage={5} onPageChange={setPage}/>
            </div>

            <div className='mainDiv'>
              {
                data.map((title) => {
                  return <div>
                          <CartpageDetails item={title} />
                         </div>
                }) 
              }
            </div> 
        </div>
    )
}

// given the current page
// given the last page
// create a pagination component

const PaginationComponent = ({
  currentPage,
  lastPage,
  onPageChange
}) => {
  const arr = new Array(lastPage).fill(0);
  return (
    <div>
      {
        arr.map((item, page)=> <button onClick={()=>onPageChange(page+1)} disabled={(page+1)===currentPage}> {page+1} </button> )
      }
    </div>
  )
}

export default Cartpage




