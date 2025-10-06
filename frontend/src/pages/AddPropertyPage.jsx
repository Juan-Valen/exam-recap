import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPropertyPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [squareFeet, setSquareFeet] = useState(0);
  const [yearBuilt, setYearBuilt] = useState(0);

  const navigate = useNavigate();
 
  const addProperty = async (newProperty) => {
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProperty),
      });
      if (!res.ok) {
        throw new Error("Failed to add property");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newProperty = {
      title,
      type,
      description,
      price,
      location: {
        address,
        city,
        state,
        zipCode
      },
      squareFeet,
      yearBuilt
    };

    addProperty(newProperty);
    return navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Property</h2>
      <form onSubmit={submitForm}>
        <label>Property title:</label>
        <input
          type="text"
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Property type:</label>
        <input
          type="text"
          required
          placeholder="type (Apartment, House...)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          />

        <label>Property Description:</label>
        <textarea
          required
          placeholder="description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price:</label>
        <input
          type="number"
          required
          placeholder="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Location:</label>
        <input
          type="text"
          required
          placeholder="address 1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="State / Region"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="zip code (001500)"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <label>Square Feet:</label>
        <input
          type="number"
          required
          value={squareFeet}
          onChange={(e) => setSquareFeet(e.target.value)}
        />
        <label>Year Built:</label>
        <input
          type="number"
          required
          value={yearBuilt}
          onChange={(e) => setYearBuilt(e.target.value)}
        />
        <button>Add Property</button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
