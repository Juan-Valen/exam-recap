import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PropertyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteProperty = async (id) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete property");
      }
      navigate("/");
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log("id: ", id);
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const onDeleteClick = (propertyId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + propertyId
    );
    if (!confirm) return;

    deleteProperty(propertyId);
  };

  return (
    <div className="property-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{property.title}</h2>
          <p>Type: {property.type}</p>
          <p>Description: {property.description}</p>
          <p>Price: {property.price} €</p>
          <p>Location: {property.location.address+", "+property.location.city+", "+property.location.state+", "+property.location.zipCode}</p>
          <p>Square Feet: {property.squareFeet} m²</p>
          <p>Year Built: {property.yearBuilt}</p>
          <button onClick={() => onDeleteClick(property._id)}>delete</button>
          <button onClick={() => navigate(`/edit-property/${property._id}`)}>edit</button>
        </>
      )}
    </div>
  );
};

export default PropertyPage;
