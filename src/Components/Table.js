
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Table(props) {
  const [users,setusers]=useState([]);
  const [digit,setDigit]=useState(10);
  const [loading,setLoading]=useState(true);
  const count=()=>{
    setDigit(digit-1);
}
var myVar = setInterval(count, 1000);
  useEffect(() => {
    const controller = new AbortController();

    setTimeout(() => {
        // Then give it in the fetch options, so the controller is properly linked
        fetch('https://jsonplaceholder.typicode.com/users', {signal: controller.signal})
            .then(res => res.json())
            .then(users =>{
              console.log(users)
              // this.setState({users, isLoading: false })
              setusers(users);
              setLoading(false);
            })
            .catch(err => {
                // Handle error ..
            })
    }, 5000);

    // Then on the "unmount" of the component, abort the API call ..
    return () => controller.abort();

  },[])
  return (<div class="first">
    <Link to="/piechart"><button>PieChart Button</button></Link>

    {loading && digit>0 &&
    <div>Loading....{digit}</div>}
    {users.length > 0 &&
     (
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
      </tr>
        {
          users.map((user)=>(
            <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.company.name}</td>
          </tr>
          ))
        }
</table>
    )}
    {!loading && users.length==0 &&
    <div>
    No users.
</div>}
  </div>)
}

export default Table;