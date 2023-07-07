import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li><NavLink to="/services">Services</NavLink></li>                
                <li><NavLink to="/shows">Shows</NavLink></li>                
                <li><NavLink to="/services/new">Add a Service</NavLink></li>                
            </ul>
        </div>
    )
}

export default Navbar;