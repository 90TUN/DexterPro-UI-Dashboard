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

function TopRatedBusinesses() {
  const [businesses, setBusinesses] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch("https://api.getdexterapp.com/api/backoffice/top-rated/businesses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();

        if (!responseData.data) {
          throw new Error("Data not found in response");
        }

        const sortedBusinesses = responseData.data.sort((a, b) => b.average_rating - a.average_rating);
        const topRatedBusinesses = sortedBusinesses.slice(0, 5);

        const formattedData = topRatedBusinesses.map((data) => ({
          id: data.id,
          name: data.name,
          cover_image: data.cover_image,
          average_rating: data.average_rating,
        }));

        setBusinesses(formattedData);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchBusinesses();
  }, []);

  return (
    <div className="top-rated-vendors">
      {dataLoaded && <h3>Top Rated Businesses</h3>}
      {businesses.map((business) => (
        <div className="vendor-row" key={business.id}>
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
                  src={business.cover_image}
                  alt={business.name}
                />
                <div
                  className="vendor--line"
                  style={{
                    fontWeight: "bold",
                    maxWidth: "100px",
                    wordWrap: "break-word",
                    fontSize: "12px",
                  }}
                >
                  {business.name}
                </div>
              </div>
              <div className="vendor--p2">
                <StarRating rating={business.average_rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopRatedBusinesses;
