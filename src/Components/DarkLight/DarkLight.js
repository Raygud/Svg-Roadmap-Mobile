import React,{useState} from 'react'
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import './DarkLight.css'


const DarkLight = (props) => {
    // const [a,setA] = useState(false)
    console.log("hey")
  return (
      <>
      {/* <button onClick={() => setA(!a)}></button> */}
    <button className="DarkLight">
      <BsMoonStarsFill/>
      <BsSunFill/>
      <div className={props.Active?"SwitcherDark Switcher":"SwitcherLight Switcher"}></div>
    </button>
    </>
  )
}

export default DarkLight
