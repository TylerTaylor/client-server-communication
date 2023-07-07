import './App.css';

import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import ServiceContainer from './components/ServiceContainer';
import ServiceForm from './components/ServiceForm';
import ShowContainer from './components/ShowContainer';
import Navbar from './components/Navbar';
import ServiceDetail from './components/ServiceDetail';
import { useNavigate } from 'react-router-dom'
import ServiceEditForm from './components/ServiceEditForm';

function App() {
  const [services, setServices] = useState([])
  const [shows, setShows] = useState([])
  const [serviceToEdit, setServiceToEdit] = useState(false)

  const navigate = useNavigate()

  // 3. GET services on initial load
    // 3.1 Set services in state

  // 4 - move to ServiceDetail.js

  const addService = (service) => {
    setServices(services => [...services, service])
  }

  const updateService = (serviceToUpdate) => {
    setServices(services => services.map(service => {
      if (service.id === serviceToUpdate.id) {
        return serviceToUpdate
      } else {
        return service
      }
    }))
  }

  const deleteService = (deletedService) => {
    setServices(services => 
      services.filter(service => service.id !== deletedService.id)
    )
  }

  const handleEdit = (service) => {
    setServiceToEdit(service)
    navigate(`/services/${service.id}/edit`)
  }

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route 
          exact path="/services/new" 
          element={<ServiceForm addService={addService} />} 
        />
        <Route 
          exact path="/services" 
          element={<ServiceContainer services={services} />}
        />
        <Route
          path="/services/:id"
          element={<ServiceDetail deleteService={deleteService} handleEdit={handleEdit} />}
        />
        <Route
          path="/services/:id/edit"
          element={<ServiceEditForm updateService={updateService} serviceToEdit={serviceToEdit} />}
        />
        <Route 
          exact path="/shows" 
          element={<ShowContainer shows={shows} />} 
        />
      </Routes>
    </div>
  );
}

export default App;
