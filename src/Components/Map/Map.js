import React,{useState,useEffect} from 'react' 
import { MapContainer, TileLayer, useMap, Marker , Popup, Icon } from 'react-leaflet'
import axios from 'axios'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'
import './Map.css'
import SvgPath from '../SvgPath/SvgPath'
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

const Map = () => {

  const pull_data = (data) => {
    console.log(data); 
    setCategoryToFetch(data)

  }

  const icon = L.icon({ iconUrl: "/images/marker-icon.png",     
  iconAnchor: [125, 41],
  popupAnchor: [-113, -40]});


    function onClick(x){
        console.log(x)
        setIsClicked(x)
    }

  const StartingPosition = [57.000, 9.9187]
  const MarkerCoords = [{coord:[57.048,9.9187]},{coord:[57.038,9.9187]},{coord:[57.018,9.9187]},]

  const [runEffect, setRunEffect] = useState(false);
  const [coursedata, setCourseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isClicked, setIsClicked] = useState([]);
  const [mapMode, setMapMode] = useState(false);
  const [categoryToFetch, setCategoryToFetch] = useState([]);
  // fetch data
  useEffect(() => {
      
    axios
      .get('https://sequelize-roadmap.herokuapp.com/course')
      .then((response) => {
        console.log(response);
        setCourseData(response);
      })
      .catch((e) => {
        // console.log(e);
      });
  }, [runEffect]);
  return (
    <>
    <button className="DarkLight" onClick={() => setMapMode(!mapMode)}>
    <BsSunFill/>
      <BsMoonStarsFill/>
      <div className={mapMode ?"SwitcherDark Switcher":"SwitcherLight Switcher"}></div>
    </button>
    <div className="MapsContainerFlex">
           {categoryData ? <div className={mapMode? "DarkMode MapContainer":"MapContainer"}>
       <MapContainer id="map" center={StartingPosition} zoom={12} scrollWheelZoom={true}>
  
<TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  
  {coursedata.data?.map((coords, coordsidx) => (
    <React.Fragment key={coordsidx}>
    {coursedata.data[coordsidx].category.title == categoryToFetch ?
    <div id="MarkerStick" >
        <Marker key={coordsidx} eventHandlers={{ click: () => (onClick(coordsidx)) }} position={[coords.lat,coords.lng]} icon={icon} key={coordsidx}>
      <div className={isClicked == coordsidx ? "StickyPopUp":"HiddenPopUp"} key={coordsidx}>
      <div className="StickyHeader">
      <h2 className="StickyHeaderTitel">{coords.school.name}</h2>
      <button className="StickyPopUpButton" onClick={() => setIsClicked(null)}>X</button>
      </div>
      <img className="StickyHeaderImg" src={coords.school.image}></img>
      <div className="StickHeaderInfo">
      <h6 className="StickyHeaderName">{coords.name}</h6>
      <p className="StickyHeaderDuration">Varighed: {coords.duration}</p>
      <p className="StickyHeaderDescription">{coords.description}</p>
      </div>
    </div>
  </Marker></div>: <div></div>}
  </React.Fragment>
      ))}
  
</MapContainer> 
</div>:<div></div>}

</div>


        <SvgPath func={pull_data} funcClose={setIsClicked}/>
    </>
  )
}

export default Map

