import React, { useEffect, useState } from "react";
import axios from "axios";

function FetchData() {
  const [tableData, setTableData] = useState([]);
  const [activeTable, setActiveTable] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const itemsPerPage = 10; // Change this value as needed

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const urls = [
          "https://beta.getdexterapp.com/api/test",
          "https://beta.getdexterapp.com/api/test?page=2",
          "https://beta.getdexterapp.com/api/test?page=3",
          "https://beta.getdexterapp.com/api/test?page=4",
          "https://beta.getdexterapp.com/api/test?page=5",
          "https://beta.getdexterapp.com/api/test?page=6",
          // Add more API links here
        ];

        const fetchDataPromises = urls.map((url) => axios.get(url));
        const responses = await Promise.all(fetchDataPromises);
        const data = responses.map((response) => response.data);
        setTableData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  const handlePagination = (index) => {
    setActiveTable(index);
  };

  const goToPreviousPage = () => {
    setActiveTable((prev) => (prev - 1 >= 0 ? prev - 1 : tableData.length - 1));
  };

  const goToNextPage = () => {
    setActiveTable((prev) => (prev + 1) % tableData.length);
  };

  const handleFilterToggle = () => {
    setShowIncomplete((prev) => !prev);
  };

  const filteredData = showIncomplete
    ? tableData.flatMap((page) =>
        page.data.filter((user) => !user.shop && !user.business),
      )
    : tableData.flatMap((page) => page.data);

  const startIndex = activeTable * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, filteredData.length);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages dynamically

  return (
    <div
      className="Container fetch"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {!loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={handleFilterToggle}
            style={{
              borderRadius: "20px",
              padding: "5px 10px",
              backgroundColor: "#3A5743",
              color: "#CFCCD6",
              margin: "10px",
            }}
          >
            {showIncomplete ? "Show All Users" : "Show Incomplete Users"}
          </button>
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {tableData.length > 0 ? (
            <>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone number</th>
                      <th>Available balance</th>
                      <th>Qualification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData
                      .slice(
                        activeTable * itemsPerPage,
                        (activeTable + 1) * itemsPerPage,
                      )
                      .map((user, index) => (
                        <tr key={index}>
                          <td>
                            {user.first_name} {user.last_name}
                          </td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.available_balance}</td>
                          <td>{user.qualification}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div
                className="pagination"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                  flexDirection: "row-reverse",
                  padding: "10px",
                }}
              >
                <div>
                  <button
                    className="arrow-button"
                    onClick={goToPreviousPage}
                    style={{
                      width: "25px",
                      height: "27px",
                      borderRadius: "5px",
                      backgroundColor: "white",
                      marginRight: "24px",
                      border: "2px solid #8D9091",
                      cursor: "pointer",
                    }}
                  >
                    &#8249;
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePagination(index)}
                      className={`pagination-button ${index === activeTable ? "active" : ""}`}
                      style={{
                        marginRight: "10px",
                        backgroundColor:
                          index === activeTable ? "#3A5743" : "transparent",
                        color: index === activeTable ? "white" : "#3A5743",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        width: "30px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className="arrow-button"
                    onClick={goToNextPage}
                    style={{
                      width: "25px",
                      height: "27px",
                      borderRadius: "5px",
                      backgroundColor: "white",
                      border: "2px solid #8D9091",
                      cursor: "pointer",
                    }}
                  >
                    &#8250;
                  </button>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  {startIndex}-{endIndex} of {totalItems} items
                </div>
              </div>
            </>
          ) : (
            <p>No data available.</p>
          )}
        </>
      )}
    </div>
  );
}

export default FetchData;
