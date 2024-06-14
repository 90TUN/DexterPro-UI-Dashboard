import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

// Setting the app element for accessibility
Modal.setAppElement("#root");

function FetchVendorData() {
  const [tableData, setTableData] = useState([]);
  const [activeTable, setActiveTable] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const itemsPerPage = 10; // Change this value as needed

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        let allData = [];
        let currentPage = 1;
        let totalPages = 1;

        while (currentPage <= totalPages) {
          const url = `https://api.getdexterapp.com/api/backoffice/vendors?page=${currentPage}`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          allData = [...allData, ...response.data.data];
          totalPages = response.data.meta.last_page;
          currentPage++;
        }

        setTableData(allData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  const handlePagination = (index) => {
    setActiveTable(index);
  };

  const goToPreviousPage = () => {
    setActiveTable((prev) =>
      prev - 1 >= 0
        ? prev - 1
        : Math.ceil(filteredData.length / itemsPerPage) - 1,
    );
  };

  const goToNextPage = () => {
    setActiveTable(
      (prev) => (prev + 1) % Math.ceil(filteredData.length / itemsPerPage),
    );
  };

  const handleRowClick = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleCloseModal = () => {
    setSelectedVendor(null);
    setShowConfirmDelete(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setActiveTable(0); // Reset to the first page on search
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleDeleteVendor = async () => {
    if (!selectedVendor) return;

    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(
        `https://api.getdexterapp.com/api/backoffice/vendors/${selectedVendor.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Remove the vendor from the tableData
      const updatedTableData = tableData.filter(
        (vendor) => vendor.id !== selectedVendor.id,
      );
      setTableData(updatedTableData);
      handleCloseModal(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting vendor:", error);
      setError("Failed to delete vendor");
    }
  };

  const filteredData = tableData.filter(
    (data) =>
      data.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.id.toString().includes(searchQuery) ||
      data.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const startIndex = activeTable * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div
      className="Container fetch"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search by ID..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginTop: "30px",
          }}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredData.length > 0 ? (
            <>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone number</th>
                      <th>ID</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData
                      .slice(startIndex, endIndex)
                      .map((data, index) => (
                        <tr key={index} onClick={() => handleRowClick(data)}>
                          <td>
                            {data.first_name} {data.last_name}
                          </td>
                          <td>{data.email}</td>
                          <td>{data.phone}</td>
                          <td>{data.id}</td>
                          <td>{data.created_at}</td>
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
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Modal for showing vendor details */}
      <Modal
        isOpen={!!selectedVendor && !showConfirmDelete}
        onRequestClose={handleCloseModal}
        contentLabel="Vendor Details"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {selectedVendor && (
          <div>
            <h2>Vendor Details</h2>
            <p>
              <strong>ID:</strong> {selectedVendor.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedVendor.first_name}{" "}
              {selectedVendor.last_name}
            </p>
            <p>
              <strong>Email:</strong> {selectedVendor.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedVendor.phone}
            </p>
            <p>
              <strong>Available Balance:</strong>{" "}
              {selectedVendor.available_balance}
            </p>
            <p>
              <strong>Qualification:</strong> {selectedVendor.qualification}
            </p>
            <p>
              <strong>NIN:</strong> {selectedVendor.nin}
            </p>
            <p>
              <strong>Created At:</strong> {selectedVendor.created_at}
            </p>
            <p>
              <strong>Updated At:</strong> {selectedVendor.updated_at}
            </p>
            <p>
              <strong>Deleted At:</strong> {selectedVendor.deleted_at}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleCloseModal}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#3A5743",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
              <button
                onClick={handleDeleteClick}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#d9534f",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Delete Vendor
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={showConfirmDelete}
        onRequestClose={() => setShowConfirmDelete(false)}
        contentLabel="Confirm Delete"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <div>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this vendor?</p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => setShowConfirmDelete(false)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#3A5743",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              No
            </button>
            <button
              onClick={handleDeleteVendor}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FetchVendorData;
