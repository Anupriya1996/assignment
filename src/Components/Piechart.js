import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';


const Page_one = () => {
    const [digit,setDigit]=useState(10);
    const [data,setData]=useState([
        { title: 'One', value: 1, color: '#6A2135' },
        { title: 'Two', value: 1, color: '#6A2135' },
        { title: 'Three', value: 1, color: '#6A2135' },
        { title: 'Four', value: 1, color: '#6A2143' },
        { title: 'Five', value: 1, color: '#6A2435' }
      ])
    const [loading,setLoading]=useState(true);
    const count=()=>{
        setDigit(digit-1);
    }
    var myVar = setInterval(count, 1000);
    
  useEffect(() => {
    const controller = new AbortController();
    setTimeout(() => {
        // Then give it in the fetch options, so the controller is properly linked
        fetch('http://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5', {signal: controller.signal})
            .then(res => res.json())
            .then(data =>{
                setLoading(false);
                clearInterval(myVar);
              
              setData([
                { title: 'One', value: data.data.posts[0].content.length, color: '#E38627' },
                { title: 'Two', value: data.data.posts[2].content.length, color: '#C13C37' },
                { title: 'Three', value: data.data.posts[3].content.length, color: '#6A2135' },
                { title: 'Four', value: data.data.posts[4].content.length, color: '#6A2143' },
                { title: 'Five', value: data.data.posts[1].content.length, color: '#6A2435' }
              ]);
            
            })
            .catch(err => {
                // Handle error ..
            })
    }, 5000);

    // Then on the "unmount" of the component, abort the API call ..
    return () => controller.abort();

  },[])
    return (
        <div class="second">

        <div><Link to="/"><button> Table Page!</button></Link> </div>
                            
       <div>
       {!loading &&
       <PieChart
       
       viewBoxSize = {[500,500]}
          data={data}
        />}
        {loading && digit>0 &&
        <div>Loading....{digit}</div>

        }

       </div>      
      </div>
    )
}

export default Page_one;






