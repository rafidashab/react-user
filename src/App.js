import React, {useState, useEffect} from 'react'; 
import UserTable from './tables/UserTable';
import AddUserForm from './form/AddUserForm';
import EditUserForm from './form/EditUserForm';
import axios from 'axios';

const url = 'http://34.68.101.4:8080'

function App() {

  const [users, setUsers] = useState([]);               //Used to keep track of all saved the users
  const [editing, setEditing] = useState(false);        //Used to show the appropiate form 

  //only calls the first time
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(url+'/api/users');
      console.log('This is only called the first time');
      setUsers(res.data);
    }
    fetchUser();
  }, [])

  //initial state of the form
  const intialEditFormState = {
    id: null,
    name: "",
    age: "",
  };

  //currentUser is passed to the edit form
  const [currentUser, setCurrentUser] = useState(intialEditFormState);

  const addUser = async (user) => {
    const newUser = await axios.post(url+'/api/user', user);
    setUsers([...users, newUser.data]);    //This contacinates the new user to the users list along with the old users
  }

  const deleteUser = async (id) => {
    setEditing(false);
    await axios.delete(url+'/api/user/'+id);
    setUsers(users.filter(user => user.id !== id));
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

  const updateUser = async (id, updatedUser) => {
    setEditing(false);
    const {data} = await axios.put(url+'/api/user/'+id, updatedUser);  //axious returns data inside an object
    setUsers(users.map(user => (user.id ===  updatedUser.id ? data : user)))
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
