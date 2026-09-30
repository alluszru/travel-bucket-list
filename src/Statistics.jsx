import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';

function Statistics(props) {

    const visited = (props.destinations.filter((destination) => destination.status === "Visited")).length;
    const dreaming = (props.destinations.filter((destination) => destination.status === "Dreaming")).length;
    const booked = (props.destinations.filter((destination) => destination.status === "Booked")).length;
    const planning = (props.destinations.filter((destination) => destination.status === "Planning")).length;
    const favorite = (props.destinations.filter((destination) => destination.favorite === true)).length;
    
    return (
        <div className="statsContainer">
            <div className="statsIcon"><BarChartIcon /></div>
            <div className="statsLabel">{props.columnsLabelImage.Dreaming} 
                <div  className="statNumber">
                    {dreaming}
                </div> 
            </div>
            <div className="statsLabel">{props.columnsLabelImage.Planning} 
                 <div  className="statNumber">
                    {planning}
                </div> 
            </div>
            <div className="statsLabel">{props.columnsLabelImage.Booked} 
                <div className="statNumber">
                    {booked}
                </div> 
            </div>
            <div className="statsLabel">{props.columnsLabelImage.Visited} 
                <div className="statNumber">
                    {visited}
                </div> 
                </div>
            <div className="statsLabel">  <StarOutlinedIcon className="favIcon"/> 
                <div className="statNumber">
                    {favorite}
                </div> 
            </div>
        </div>
    )
}

export default Statistics;