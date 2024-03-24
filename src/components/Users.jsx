import React, { useEffect, useState } from "react";
import UsersGrid from "./UsersGrid";

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response=>response.json())
        .then(data=> {
            setUsers(data);
        });
    }, []);

    return (
          <UsersGrid 
          users={users}
          />
    );
};



export default Users;