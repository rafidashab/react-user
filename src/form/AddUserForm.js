import React, {useState} from 'react';

const AddUserForm = props => {

    const initialState = {
        id: null, 
        name: "",
        age: "",
    };

    const [user, setUser] = useState(initialState);

    const handleInputChange = (event) => {
        console.log(event.target);
        const {name, value} = event.target;
        setUser({...user, [name]: value});  //updates the corresponding keys in the user object
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!user.name || !user.age) return;
        props.addUser(user);
        setUser(initialState);
    }

    return (
    <form className="form-group" onSubmit={handleSubmit}>
        <label>Name</label>
        <input className="form-control" type="text" name="name" value={user.name} onChange={handleInputChange} />
        <label>Age</label>
        <input className="form-control" type="text" name="age" value={user.age} onChange={handleInputChange}/>
        <button className="btn btn-success mt-2">Add new user</button>
    </form>
    );
}

export default AddUserForm;