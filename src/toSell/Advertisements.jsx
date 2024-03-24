import Categories from "../components/Categories";
import ResponsiveGrid from "./ResponsiveGrid";

const Advertisements = (props) => {
    
    return(
        <div className='display-row'>
        <Categories />
        <ResponsiveGrid />
        </div>
    )
}

export default Advertisements ;