import ServiceCard from "./ServiceCard";

function ServiceContainer({ services }) {

    const displayServices = services.map(service => (
        <ServiceCard 
            name={service.name} 
            price={service.price}
            id={service.id}
            key={`service-${service.id}`} 
        />
    ))

    return (
        <div className="container">
            <h1>Available Services</h1>
            <div className="service-container">
                {displayServices}
            </div>
        </div>
    )
}

export default ServiceContainer;