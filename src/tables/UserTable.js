import React from 'react';

function UserTable(props) {

    function showUser(props) {
        if (props.users.length > 0) {
            return (props.users.map(user => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>
                        <button className="btn btn-primary mr-2" onClick={() => props.editRow(user)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => props.deleteUser(user.id)}>Delete</button>
                    </td>
                </tr>
            )))
        }
        else {
            return(
            <tr>
                <td> No User Found </td>
            </tr>
            )   
        };
    }

    return (
        <table className="table"> 
            <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody> 
                {
                    showUser(props)
                }
            </tbody>
        </table>
    );
}

export default UserTable;