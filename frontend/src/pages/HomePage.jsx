import { useEffect, useState } from "react";
import PropertyListings from "../components/PropertyListings";

const Home = () => {
  const [properties, setPropertys] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertys = async () => {
      try {
        const res = await fetch("api/properties");
        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        const data = await res.json();
        setIsPending(false);
        setPropertys(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    // setTimeout(() => {fetchPropertys();}, 1000); // Delay of 1 second
    fetchPropertys();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {properties && <PropertyListings properties={properties} />}
    </div>
  );
};

export default Home;
