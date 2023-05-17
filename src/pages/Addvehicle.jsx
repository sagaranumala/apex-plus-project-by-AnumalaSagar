import React from 'react'
import { useEffect,useState,useRef } from 'react';
import axios from 'axios'
import "./Addvehicle.css"

function Addvehicle() {
   const [senariodata,setScenarioData]=useState([]);
   const [vehicleData,setVehicleData]=useState()
   const [value,setValue]=useState("");
   const [currentSenariodata,setCurrentScenarioData]=useState();
   const [direction,setDirection]=useState();
   const scenario=useRef();
   const vehicleSpeed=useRef();
   const vehicleName=useRef();
   const positionX=useRef();
   const positionY=useRef();
  const vehiceDirection=useRef();

  useEffect(()=>{
       axios.get('http://localhost:8000/mydata')
          .then(res =>{
             setScenarioData(res.data)
          }).catch(err => console.log(err));
   },[])
   //console.log(senariodata)
   const handleChange=(e)=>{
       senariodata.map((item)=>{
         if(item.scenarioName==e.target.value){
            //console.log(item.id)
            setCurrentScenarioData(item)
          }
       })
        setValue(e.target.value)
   }
   const handleDirection=(e)=>{
      setDirection(e.target.value)
   }
   const addVehicle=()=>{
            let data={};
            let data2={};
            let data1=currentSenariodata.vehicleList;
            data.scenarioName=scenario.current.value;
            data.scenarioTime=currentSenariodata.scenarioTime;
            data2.vehicleName=vehicleName.current.value;
            data2.vehicleSpeed=vehicleSpeed.current.value;
            data2.positionX=positionX.current.value;
            data2.positionY=positionY.current.value;
            data2.vehiceDirection=vehiceDirection.current.value;
            data1.push(data2)
            data.vehicleList=data1
            setVehicleData(data)
            //console.log(data)
            reset()
   }
   const reset=()=>{
      scenario.current.value='';
      vehicleName.current.value='';
      vehicleSpeed.current.value='';
      positionX.current.value='';
      positionY.current.value='';
      vehiceDirection.current.value='';
   }
   useEffect(()=>{
      if(vehicleData){
         axios.put(`http://localhost:8000/mydata/${currentSenariodata.id}`,vehicleData)
            .then(res =>{
               alert('success')
            }).catch(err => console.log(err));
        }
     },[vehicleData])
  return (
    <div className='vehicle_container'>
      <span className='vehicle_add'>Vehicle / add</span>
      <span className='vehicle_head'>Add Vehicle</span>
      <div className='vehicle_list'>
         <div>
            <label htmlFor="select_scenario" style={{color:"white"}}>Scenarios List</label>
            <select className='dropdown1' id='select_scenario' placeholder='Select Scenario' value={value} onChange={handleChange} ref={scenario}>
               <option>Select Scenario</option>
                  {senariodata.map((item)=>{
                  return  <option value={item.scenarioName}>{item.scenarioName}</option>
         
                  })

                  }
            </select>
            </div>
            <div>
              <label htmlFor="vehicle_name" style={{color:"white"}}>Vehicle Name</label>
              <input type="text" id="vehice_name" className='vehicle_name' ref={vehicleName}/>
           </div>
           <div>
              <label htmlFor="vehicle_speed" style={{color:"white"}}>Speed</label>
              <input type="number" id="vehicle_speed" className='speed' ref={vehicleSpeed}/>
           </div>
           <div>
              <label htmlFor="position_x" style={{color:"white"}}>Position X</label>
              <input type="number" id="position_x" min="1" max="800" className='position_X' ref={positionX}/>
           </div>
           <div>
              <label htmlFor="position_y" style={{color:"white"}}>Position Y</label>
              <input type="number" id="position_x" className='position_Y' ref={positionY}/>
           </div>
           <div>
           <label htmlFor="vehicle_direction" style={{color:"white"}}>Scenarios List</label>
            <select className='direction' id='svehicle_direction' value={direction} onChange={handleDirection} ref={vehiceDirection}>
               <option>Select Scenario</option>
               <option value="Towards">Towards</option>
               <option value="Backwards">Backwards</option>
               <option value="Upwards">Upwards</option>
               <option value="Downwards">Downwards</option>
            </select>
           </div>
      </div>
       <div className='buttons'>
           <button type='button' className='add' onClick={addVehicle}>Add</button>
           <button type='button' className='reset' onClick={reset}>Reset</button>
           <button type='button' className='goback'>Go Back</button>
        </div>
    </div>
  )
}

export default Addvehicle
