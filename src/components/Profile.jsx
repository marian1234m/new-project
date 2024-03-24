import { Context } from "../context/Context";
import { useEffect, useContext } from "react";

const Profile = () => {
    const { user, setUser } = useContext(Context);
    
    useEffect(() => {
        fetch("http://localhost:3001/currentUser")
        .then(response=>response.json())
        .then(data=> {
          if(data){
            setUser(data[0])
          }else {
            setUser(null)
          }
        });
      }, []);
    
        return(
            <>
            {user?.username}
            </> 
    )
}

export default Profile;
