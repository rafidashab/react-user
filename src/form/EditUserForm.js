import React, {useState, useEffect} from 'react';

const EditUserForm = props => {

    const {currentUser} = props;

    const [user, setUser] = useState(currentUser);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});  //updates the corresponding keys in the user object
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!user.name || !user.age) return;
        props.updateUser(user.id, user);
    }

    //This let's us watch for parent prop updates if we need to do something if the parent props change
    useEffect(() => {
        setUser(props.currentUser)
    }, [props]);

    return (
    <form className="form-group" onSubmit={handleSubmit}>
        <label>Name</label>
        <input className="form-control" type="text" name="name" value={user.name} onChange={handleInputChange} />
        <label>Age</label>
        <input className="form-control" type="text" name="age" value={user.age} onChange={handleInputChange}/>
        <button className="btn btn-primary mt-2 mr-2"> Update User</button>
        <button className="btn btn-secondary mt-2 mr-2" onClick={() => props.setEditing(false)}>
        Cancel
        </button>
    </form>
    );
}

export default EditUserForm;