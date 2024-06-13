import React, { useState, useEffect } from "react";

function StarRating({ rating }) {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    if (i < filledStars) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else {
      stars.push(<span key={i} className="star">★</span>);
    }
  }

  return <div className="star-rating">{stars}</div>;
}

function TopRatedShops() {
  const [shops, setShops] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // State variable to track data loading

  useEffect(() => {
    async function fetchShops() {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch("https://api.getdexterapp.com/api/backoffice/top-rated/shops", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const responseData = await response.json();

        if (!responseData.data) {
          throw new Error('Data not found in response');
        }

        // Sort vendors by average rating in descending order
        const sortedShops = responseData.data.sort((a, b) => b.average_rating - a.average_rating);

        // Take only the top 5 vendors
        const topRatedShops = sortedShops.slice(0, 5);

        // Extract relevant information and format the data
        const formattedData = topRatedShops.map((data) => ({
          id: data.id,
          name: data.name,
          cover_image: data.cover_image,
          average_rating: data.average_rating,
        }));

        // Set the top 5 rated vendors to the state
        setShops(formattedData);
        setDataLoaded(true); // Set dataLoaded to true after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchShops();
  }, []);

  return (
    <div className="top-rated-vendors">
      {dataLoaded && <h3>Top Rated Shops</h3>} {/* Conditionally render h3 */}
      {shops.map((shop) => (
        <div className="vendor-row" key={shop.id}>
          <div className="vendor">
            <div className="vendor--p1">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  className="vendor--line"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "16.5px",
                    border: "3px solid #D9D9D9",
                  }}
                  src={shop.cover_image}
                  alt={shop.name}
                />
                <div
                  className="vendor--line"
                  style={{
                    fontWeight: "bold",
                    maxWidth: "100px", // Set maximum width for the container
                    wordWrap: "break-word", // Allow text to break into multiple lines
                    fontSize: "12px",
                  }}
                >
                  {shop.name}
                </div>
              </div>
              <div className="Vendor--p2">
                <div
                  className="vendor--line"
                  style={{
                    color: "black",
                    marginLeft: "16.5px",
                    marginRight: "1px",
                    wordWrap: "normal",
                    fontSize: "13px",
                    fontWeight: "bold"
                  }}
                >
                  {shop.average_rating}
                </div>
              </div>
              <div className="vendor--p3">
                <StarRating rating={shop.average_rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopRatedShops;
