
import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    // Post data to server 

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(data);
      })

  }
  return (
    <div className="App">
      <h1>My Own Data : {users.length}</h1>
      <form onSubmit={handleUser}>
        <input type="text" Name="name" placeholder='Name' required />
        <input type="text" Name="email" placeholder='Email' required />
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>Id: {user.id} Name: {user.name} Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
