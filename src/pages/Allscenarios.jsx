import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import './Allscenarios.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from "react-router-dom"

function Allscenarios() {
  const [scenarioData,setScenarioData]=useState([]);
  const [scenarioId,setScenarioId]=useState();
  
  //GETTING SCENARIODATA
  useEffect(()=>{
       axios.get('http://localhost:8000/mydata')
          .then(res =>{
            setScenarioData(res.data)
          }).catch(err => console.log(err));
   },[])

   //DELETING SCENARIO DATA BY ID
   useEffect(()=>{
    axios.delete("http://localhost:8000/mydata/"+scenarioId)
       .then(res =>{
          window.location.reload()
         // alert("deleted")
       }).catch(err => console.log(err));
},[scenarioId])

const deleteScenario=(index,e)=>{
      e.preventDefault();
      var arr=scenarioData.filter((v,i)=> i==index)
      setScenarioId(arr[0].id)
}
   //console.log(senariodata)
  return (
    <div>
        <div className='header'>
          <div><span className='headding'>All Scenarios</span></div>
          <div className='buttons'>
            <Link to="/addscenario"><button type='button' className='add_senario'>New Scenario</button></Link>
            <Link to="/addvehicle"><button type='button' className='add_vehicle'>Add vehicle</button></Link>
            <button type='button' className='delete'>Delete All</button>
          </div>
        </div>
        <table style={{border:"0"}}>
          <thead>
            <tr>
               <th>Scenario Id</th>
               <th>Scenario Name</th>
               <th>Scenario Time</th>
               <th>Number of Vehicals</th>
               <th>Add Vehicle</th>
               <th>Edit</th>
               <th>Delet</th>
            </tr>
            </thead>
            <tbody>
                {
                  scenarioData.map((d,i)=>(
                    <tr key={i}> 
                        <td>{i+1}</td>
                        <td>{d.scenarioName}</td>
                        <td>{d.scenarioTime}</td>
                        <td>{d.vehicleList.length}</td>
                        <td><button className='table_addVehicle'>+</button></td>
                        <td><EditIcon/></td>
                        <td onClick={e=>deleteScenario(i,e)}><DeleteIcon/></td>
                    </tr>
                  ))

              
                }
            </tbody>
        </table>
    </div>
  )
}

export default Allscenarios
