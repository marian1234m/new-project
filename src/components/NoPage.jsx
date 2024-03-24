import { useContext } from "react";
import { Context } from "../context/Context";

const NoPage= () => {

    const { advertisements} = useContext(Context);
    console.log(advertisements)

    return "Page not found"
}

export default NoPage;