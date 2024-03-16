import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line"; // Importing the ResponsiveLine component from Nivo for line chart

const UserGraphContainer = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiLinks = [
          "https://beta.getdexterapp.com/api/test",
          "https://beta.getdexterapp.com/api/test?page=2",
          "https://beta.getdexterapp.com/api/test?page=3",
          "https://beta.getdexterapp.com/api/test?page=4",
          "https://beta.getdexterapp.com/api/test?page=5",
          "https://beta.getdexterapp.com/api/test?page=6",
        ];

        const fetchRequests = apiLinks.map((link) => axios.get(link));
        const responses = await Promise.all(fetchRequests);
        const userDataArray = responses.flatMap(
          (response) => response.data.data,
        );
        setUserData(userDataArray);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to format user data for the line chart
  const formatUserData = (userData) => {
    const userCountsByMonth = userData.reduce((acc, user) => {
      const joinedMonth = new Date(user.created_at).getMonth() + 1; // Extract month from the created_at field
      acc[joinedMonth] = (acc[joinedMonth] || 0) + 1; // Increment count for the joined month
      return acc;
    }, {});

    // Prepare data for the line chart
    const formattedData = Object.entries(userCountsByMonth).map(
      ([month, count]) => ({
        x: parseInt(month), // Convert month to integer
        y: count,
      }),
    );

    // Fill in missing months with 0 user count
    for (let i = 1; i <= 12; i++) {
      if (!formattedData.find((data) => data.x === i)) {
        formattedData.push({ x: i, y: 0 });
      }
    }

    // Sort the data by month
    formattedData.sort((a, b) => a.x - b.x);

    return formattedData;
  };

  return (
    <div className="line--chart">
      <h1
        style={{
          textAlign: "left",
          fontSize: "20px",
          color: "#6A6B6D",
          fontWeight: "bolder",
          marginBottom: "40px",
        }}
      >
        Users on Dexter App
      </h1>
      <div style={{ height: "400px", position: "relative", width: "auto" }}>
        <ResponsiveLine
          data={[{ id: "userCount", data: formatUserData(userData) }]} // Passing formatted data to ResponsiveLine
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Months",
            legendOffset: 40,
            legendPosition: "middle",
            
          }}
          axisLeft={{
            orient: "left",
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: "User",
            legendOffset: -50,
          }}
          enableGridX={false}
          colors={{ scheme: "nivo" }}
          enablePoints={true} // Enable points on the line chart
          enableGridY={true}
          enableArea={true}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              justify: false,
              translateX: 100,
              translateY: 50,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.8,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          // Custom tooltip to display user count per month
          tooltip={(tooltip) => (
            <div
              style={{
                background: "#fff",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <div>Month: {tooltip.point.data.xFormatted}</div>
              <div>User Count: {tooltip.point.data.yFormatted}</div>
            </div>
          )}
          // Custom layers to display user count per month as text on points
          layers={[
            "grid",
            "markers",
            "axes",
            "areas",
            "crosshair",
            "lines",
            "points",
            "slices",
            "mesh",
            "legends",
            ({ points }) => (
              <g>
                {points.map((point) => (
                  <g
                    key={point.id}
                    transform={`translate(${point.x},${point.y})`}
                    style={{ pointerEvents: "none" }}
                  >
                    <text
                      x={10}
                      y={-10}
                      dy={-4}
                      fontSize={10}
                      textAnchor="middle"
                      fill="#333"
                    >
                      {point.data.yFormatted}
                    </text>
                  </g>
                ))}
              </g>
            ),
          ]}
        />
      </div>
    </div>
  );
};

export default UserGraphContainer;
