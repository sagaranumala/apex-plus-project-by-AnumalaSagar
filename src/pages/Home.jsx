import React from 'react'
import { useEffect,useState,useRef } from 'react';
import './Home.css'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { cardActionAreaClasses } from '@mui/material';

function Home() {
  const [data,setData]=useState([]);
  const [vehicleData,setVehicleData]=useState([]);
  const [scenario,setScenario]=useState('');
  const [vehicle,setVehicle]=useState()
  const [id,setId]=useState();
  const [scenarioTime,setScenarioTime]=useState()

  useEffect(()=>{
    axios.get('http://localhost:8000/mydata')
       .then(res =>{
          setData(res.data)
       }).catch(err => console.log(err));
},[])

useEffect(()=>{
  if(vehicle){
     axios.put(`http://localhost:8000/mydata/${id}`,vehicle)
        .then(res =>{
           alert('success')
           window.location.reload()
        }).catch(err => console.log(err));
    }
 },[vehicle,id])

const handleChange=(e)=>{
  var newArray=data.filter(function(el){
    return el.scenarioName==e.target.value;
  })
  setVehicleData(newArray[0].vehicleList)
  setScenarioTime(newArray[0].scenarioTime);
  setScenario(e.target.value)
}

const deleteScenario=(index,e)=>{
  e.preventDefault();
  var arr=data.filter(function(el){
    return el.scenarioName==scenario;
  })
   let x=arr[0].vehicleList;
  let newArr=x.filter(function(el,i){
     return i!=index;
  })
  arr[0].vehicleList=newArr;
  setId(arr[0].id)
 setVehicle(arr[0])
}

 const moveVehicals=((e)=>{
  vehicleData.map((el)=>{
      
     //style.car.transition=`ease-in-out ${scenarioTime} top`;
    // e.targ.style.backgroundColor="red";
  })
 })
  return (
    <div>
        <div className='select_scenarioname'>
        <label htmlFor="select_scenario" style={{color:"white"}}>Scenarios List</label>
            <select className='dropdown2' id='select_scenario' placeholder='Select Scenario' value={scenario} onChange={handleChange}>
                        <option>Select Scenario</option>
                  {data.map((item)=>{
                  return <option value={item.scenarioName}>{item.scenarioName}</option>
                  })
                  }
            </select>
        </div>
        <table>
          <thead>
            <tr>
               <th>Vehicle Id</th>
               <th>Vehicle Name</th>
               <th>Position X</th>
               <th>Position Y</th>
               <th>Speed</th>
               <th>Direction</th>
               <th>Edit</th>
               <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {
                  vehicleData.map((d,i)=>(
                    <tr key={i}> 
                        <td>{i+1}</td>
                        <td>{d.vehicleName}</td>
                        <td>{d.positionX}</td>
                        <td>{d.positionY}</td>
                        <td>{d.vehicleSpeed}</td>
                        <td>{d.vehiceDirection}</td>
                        <td><EditIcon/></td>
                        <td onClick={e=>deleteScenario(i,e)}><DeleteIcon/></td>
                    </tr>
                  ))
                }
            </tbody>
        </table>
        <div className='simulation'>
        <button className='start' onClick={moveVehicals}>Start Simulation</button>
        <button className='stop'>Stop Simulation</button>
        </div>
        <div className='graph'>
                     {
              vehicleData.map((d,i)=>{
                  //console.log(d)
                return <h1 className='car' style={{position: "absolute",top:`${d.positionX}px`,left:`${d.positionY}px`,color:"red"}}>*</h1>
              })
            }
        </div>
    </div>
  )
}

export default Home
