import React, { useEffect, useState } from 'react'
import CartpageDetails from './CartpageDetails';
import axios from "axios"
import "./Cartpage.css"


const Cartpage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=>{
        fetchData();
      },[])

    const fetchData = async () => {
        setLoading(true);
        axios({
          method: 'get',
          url: "https://api.jikan.moe/v4/anime",
        //   params: {
        //     // _page: page,
        //     // _limit: 5,
        //     // rating_gte: filterRating,
        //     // q: q,
        //     // ...paramsForPayment
        //   }
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

    console.log("res", data)

    return (
        <div>
            { loading && <div>loading</div>}
             <div className='mainDiv'>
            {
                data.map((e) => {
                  return <div>
                    <CartpageDetails item={e} />
                  </div>
                }) 
            }
            </div> 

          
        </div>
    )
}

export default Cartpage




