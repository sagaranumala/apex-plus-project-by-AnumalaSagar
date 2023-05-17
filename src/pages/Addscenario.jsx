import React from 'react'
import {useRef,useState,useEffect} from 'react'
import axios from 'axios'
import "./Addscenario.css"
import {Link} from "react-router-dom"

function Addscenario() {
     const [data,setData]=useState();
     const scenarioName=useRef();
    const scenarioTime=useRef();
    const submit=(e)=>{
            e.preventDefault();
            var data1={};
            data1.scenarioName=scenarioName.current.value;
            data1.scenarioTime=scenarioTime.current.value;
            data1.vehicleList=[];
            reset();
            setData(data1)
     }
     const reset=()=>{
      scenarioName.current.value='';
      scenarioTime.current.value='';
     }
     useEffect(()=>{
      if(data){
         axios.post('http://localhost:8000/mydata',data)
            .then(res =>{
               alert('success')
            }).catch(err => console.log(err));
        }
     },[data])
     //console.log(data)
  return (
    <div className='container-add'>
      <span className='add_scenario'>Scenario / add</span>
      <span className='head'>Add Scenario</span>
      <div className='input_box'>
           <div>
              <label htmlFor="scenario_name" style={{color:"white"}}>Scenario Name</label>
              <input type="text" id="scenario_name"  className='scenario_name' ref={scenarioName}/>
           </div>
           <div>
              <label htmlFor="scenario_time" style={{color:"white"}}>Scenario Time(seconds)</label>
              <input type="number" id="scenario_time" className='scenario_time' ref={scenarioTime}/>
           </div>
        </div>
        <div className='buttons'>
           <button type='button' id='add' onClick={submit}>Add</button>
           <button type='button' id='reset' onClick={reset}>Reset</button>
           <Link to="/"><button type='button' id='goback'>Go Back</button></Link>
        </div>
    </div>
  )
}

export default Addscenario
