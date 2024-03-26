import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";

const UserGraphContainer = () => {
  const [userData, setUserData] = useState([]);
  const [showSecondHalf, setShowSecondHalf] = useState(false);

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

  const formatUserData = (userData) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const userCountsByMonth = userData.reduce((acc, user) => {
      const joinedMonth = new Date(user.created_at).getMonth(); // Get month index
      acc[joinedMonth] = (acc[joinedMonth] || 0) + 1;
      return acc;
    }, {});

    const filteredData = Object.entries(userCountsByMonth)
      .filter(([month]) => {
        if (showSecondHalf) {
          return parseInt(month) > 5;
        } else {
          return parseInt(month) <= 5;
        }
      })
      .map(([month, count]) => ({
        x: months[parseInt(month)],
        y: count,
      }));

    const formattedData = [];
    const start = showSecondHalf ? 6 : 0;
    const end = start + 6;
    for (let i = start; i < end; i++) {
      const existingData = filteredData.find((data) => data.x === months[i]);
      formattedData.push(existingData || { x: months[i], y: 0 });
    }

    return formattedData;
  };

  const toggleDataView = (direction) => {
    setShowSecondHalf(direction === "next" ? true : false);
  };

  return (
    <div>
      <div className="graph-nav">
        <div style={{ float: "left" }}>
          <h1
            style={{
              textAlign: "left",
              fontSize: "20px",
              color: "#6A6B6D",
              fontWeight: "bolder",
            }}
          >
            Users on Dexter App
          </h1>
        </div>
        <div style={{ float: "right", width: "auto", display: "inline" }}>
          <p className="graph-nav-p" style={{ marginBottom: 0 }}>
            <img src="./images/calender.png" alt="" />
            <span className="graph-nav-text">
              {" "}
              {showSecondHalf ? "Last 6 Months" : "First 6 Months"}
            </span>
            <button onClick={() => toggleDataView("prev")}>{"<"}</button>
            <button onClick={() => toggleDataView("next")}>{">"}</button>
          </p>
        </div>
        <div style={{ clear: "both" }}></div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "530px",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <div className="line--chart">
          <div style={{ height: "400px", position: "relative", width: "100%" }}>
            <ResponsiveLine
              data={[{ id: "users", data: formatUserData(userData) }]}
              margin={{ top: 50, right: 110, bottom: 70, left: 60 }}
              curve="catmullRom"
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
                tickSize: 0,
                tickPadding: 40,
                tickRotation: -40,
              }}
              axisLeft={{
                orient: "left",
                tickSize: 0,
                tickPadding: 12.32,
                tickRotation: 0,
              }}
              enableGridX={true}
              colors={["#3A5743"]}
              enablePoints={true}
              enableGridY={true}
              enableArea={false} // Disable area fill
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "row",
                  justify: false,
                  translateX: 100,
                  translateY: -150,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 50,
                  itemHeight: 20,
                  itemOpacity: 0.8,
                  symbolSize: 7,
                  symbolShape: "square",
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
              layers={[
                "grid",
                "markers",
                "axes",
                "crosshair",
                "lines",
                "points",
                "slices",
                "mesh",
                "legends",
                ({ points }) => (
                  <g>
                    {points.map((point) => (
                      <line
                        key={`vertical-line-${point.id}`}
                        x1={point.x}
                        y1={0}
                        x2={point.x}
                        stroke="#E6E6E6"
                        strokeWidth={1}
                      />
                    ))}
                    <line
                      x1={0}
                      x2={1}
                      y1={0}
                      y2={0}
                      stroke="#3A5743" // Color of the bottom x-axis line
                      strokeWidth={3}
                    />
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
      </div>
    </div>
  );
};

export default UserGraphContainer;
