import React, {useState} from 'react'; 
import UserTable from './tables/UserTable';
import AddUserForm from './form/AddUserForm';
import EditUserForm from './form/EditUserForm';

function App() {

  const dummyUserData = [ 
    { id: 1, name: 'Rafid', age:23 },
    { id: 2, name: 'Leo', age:21 },
    { id: 3, name: 'Mario', age:25 },
  ]

  const [users, setUsers] = useState(dummyUserData);  //Used to keep track of all saved the users
  const [editing, setEditing] = useState(false);      //Used to show the appropiate form 

  //initial state of the form
  const intialEditFormState = {
    id: null,
    name: "",
    age: "",
  }

  //currentUser is passed to the edit form
  const [currentUser, setCurrentUser] = useState(intialEditFormState);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);  //This contacinates the new user to the users list along with the old users
  }

  const deleteUser = (id) => {
    setEditing(false);
    setUsers(users.filter(user => user.id !== id))
  }

  //Update CurrentUser based on the selected row
  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({
      id: user.id,
      name: user.name,
      age: user.age
    })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container mt-3">
      <h1>Flu Heatmap</h1>
      <div className="row mt-3">
        <div className="col-md-6">
            {editing ? (
              <div>
                <h2>Edit user</h2>
                <EditUserForm
                  setEditing={setEditing}
                  currentUser={currentUser}
                  updateUser={updateUser}
                />
              </div>
            ) : (
              <div>
                <h2>Add user</h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
          </div>
        <div className="col-md-6">
          <h2>Users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser}/>
        </div>
      </div>
    </div>

  );
}

export default App;
