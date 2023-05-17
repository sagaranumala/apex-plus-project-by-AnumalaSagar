import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    return (
        <div className='box'>
           <ul className="container">
               <NavLink to="/">
                  <li className='navlink'>
                     Home
                  </li>
               </NavLink>
               <NavLink  to="/addscenario">
               <li className='navlink'>
                     Add scenario
               </li>
               </NavLink>
               <NavLink  to="/allscenarios">
               <li className='navlink'>
                   All scenarios
               </li>
               </NavLink>
               <NavLink  to="/addvehicle">
               <li className='navlink'> 
                  Add vehicle
               </li>
               </NavLink>
           </ul>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;