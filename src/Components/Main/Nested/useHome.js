import {useEffect,useState} from 'react'
import axios from 'axios';

export default function useHome(url) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [nextPageToken,setToken]=useState("");


    useEffect(()=>{
        axios.get(url) 
          .then((response)=>{
              setToken(response.data.nextPageToken);
              if(data.length!=0){
                const extraArr=[]
                data[0].forEach((item)=>{
                    extraArr.push(item)
                })

                response.data.items.forEach((item)=>{
                    extraArr.push(item)
                })

                setData([extraArr]);

              }
              else{
                setData((data)=>[response.data.items]);

              }
              setLoading(false)

          })
          .catch(error=>{
            console.log(error)
         })


    },[url])
    return {loading,data,nextPageToken};
}
