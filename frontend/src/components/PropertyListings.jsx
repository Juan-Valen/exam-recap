import { Link } from "react-router-dom";

const PropertyListings = ({ properties }) => {
  return (
    <div className="property-list">
      {properties.map((property) => (

        <div className="property-preview" key={property.id}>
          <Link to={`/properties/${property._id}`}>
            <h2>{property.title}</h2>
          </Link>
          <p>Type: {property.type}</p>
          <p>Location: {property.location.address+", "+property.location.city+", "+property.location.state+", "+property.location.zipCode}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyListings;
