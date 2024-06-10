import React, { useEffect, useState } from "react";
import axios from "axios";

function FetchServices() {
  const [tableData, setTableData] = useState([]);
  const [activeTable, setActiveTable] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const itemsPerPage = 10; // Change this value as needed

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        let allData = [];
        let currentPage = 1;
        let totalPages = 1;

        while (currentPage <= totalPages) {
          const url = `https://api.getdexterapp.com/api/backoffice/services?page=${currentPage}`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          allData = [...allData, ...response.data.data];
          totalPages = response.data.meta.last_page;
          currentPage++;
        }

        setTableData(allData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  const handlePagination = (index) => {
    setActiveTable(index);
  };

  const goToPreviousPage = () => {
    setActiveTable((prev) => (prev - 1 >= 0 ? prev - 1 : Math.ceil(tableData.length / itemsPerPage) - 1));
  };

  const goToNextPage = () => {
    setActiveTable((prev) => (prev + 1) % Math.ceil(tableData.length / itemsPerPage));
  };

  const startIndex = activeTable * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, tableData.length);
  const totalItems = tableData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div
      className="Container fetch"
      style={{ display: "flex", flexDirection: "column", marginTop: "50px"}}
    >
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
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Total Shops</th>
                      <th>Total Businesses</th>
                      <th>Bookable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData
                      .slice(startIndex, endIndex)
                      .map((data, index) => (
                        <tr key={index}>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.description}</td>
                          <td>{data.total_shops}</td>
                          <td>{data.total_businesses}</td>
                          <td>{data.is_bookable ? 'Yes' : 'No'}</td>
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
                  color: "#8D9091",
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
                      color: "#8D9091",
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
                      color: "#8D9091",
                    }}
                  >
                    &#8250;
                  </button>
                </div>
<div
className="no-of-pages"
style={{ marginLeft: "10px", color: "#8D9091" }}
>
{startIndex + 1}-{endIndex} of {totalItems} items
</div>
</div>
</>
) : (
<p>No data available.</p>
)}
</>
)}
{error && <p style={{ color: 'red' }}>{error}</p>}
</div>
);
}

export default FetchServices;
