import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ServiceDetail({ handleEdit, deleteService }) {
    const [service, setService] = useState({})
    const { name, price, shows } = service

    const { id } = useParams()
    const navigate = useNavigate()

    // 4. We need to fetch one single service via the id param
        // 4.1 Set `service` in state

    // TODO CHALLENGE 1 - GET one service by id and set our state
    useEffect(() => {

    }, [])

    // 5. Wire up our delete function
        // 5.1 Use RESTful routing to fetch via id
        // 5.2 Add a config object to the fetch, stating that it's using the DELETE method
        // 5.3 Call our `deleteService` prop, passed in from App.js, passing up the deleted service as an argument
        // 5.4 Navigate back to the /services route

    // 6 - go to ServiceForm.js

    const handleDelete = (service) => {

    }

    return (
        <div className="service-detail">
            <h2>{name}</h2>
            <p>{price}</p>

            <div className="service-buttons">
                <button onClick={() => handleEdit(service)}>Edit</button>
                <button onClick={() => handleDelete(service)}>Delete</button>
            </div>
        </div>
    )
}

export default ServiceDetail;