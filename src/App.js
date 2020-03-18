import React, {useState} from 'react'; 
import UserTable from './tables/UserTable';
import AddUserForm from './form/AddUserForm';

function App() {

  const dummyUserData = [ 
    { id: 1, name: 'Rafid', age:23 },
    { id: 2, name: 'Leo', age:21 },
    { id: 3, name: 'Mario', age:25 },
  ]

  const [users, setUsers] = useState(dummyUserData);
  
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);  //This contacinates the new user to the users list along with the old users
  }

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className="container mt-3">
      <h1>Flu Heatmap</h1>
      <div className="row mt-3">
        <div className="col-md-6">
            <h2>Add User</h2>
            <AddUserForm addUser={addUser}/>
          </div>
        <div className="col-md-6">
          <h2>Users</h2>
          <UserTable users={users} deleteUser={deleteUser}/>
        </div>
      </div>
    </div>

  );
}

export default App;
