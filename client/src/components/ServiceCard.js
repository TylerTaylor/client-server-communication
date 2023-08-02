import { Link } from "react-router-dom";

function ServiceCard({ name, price, id }) {
  return (
    <div className="service">
      <Link to={`/services/${id}`}>
        <div>
          <h2>{name}</h2>
          <p className="pink">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default ServiceCard;