import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

// Setting the app element for accessibility
Modal.setAppElement("#root");

function FetchData() {
  const [tableData, setTableData] = useState([]);
  const [activeTable, setActiveTable] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
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

        const fetchData = async (page) => {
          const url = `https://api.getdexterapp.com/api/backoffice/users?page=${page}`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        };

        const fetchDataForAllPages = async () => {
          let allData = [];
          let page = 1;
          let response = await fetchData(page);
          while (response.data.length > 0) {
            allData.push(response);
            page++;
            response = await fetchData(page);
          }
          return allData;
        };

        const allData = await fetchDataForAllPages();
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
    setActiveTable((prev) => (prev - 1 >= 0 ? prev - 1 : tableData.length - 1));
  };

  const goToNextPage = () => {
    setActiveTable((prev) => (prev + 1) % tableData.length);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowConfirmDelete(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(
        `https://api.getdexterapp.com/api/backoffice/users/${selectedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Remove the user from the tableData
      const updatedTableData = tableData
        .map((page) => ({
          ...page,
          data: page.data.filter((user) => user.id !== selectedUser.id),
        }))
        .filter((page) => page.data.length > 0); // Remove empty pages

      setTableData(updatedTableData);
      handleCloseModal(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    }
  };

  const filteredData = tableData
    .flatMap((page) => page.data)
    .filter((user) =>
      user.id.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const startIndex = activeTable * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, filteredData.length);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages dynamically

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
          placeholder="Search by ID"
          value={searchQuery}
          onChange={handleSearch}
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
          {tableData.length > 0 ? (
            <>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone number</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData
                      .slice(
                        activeTable * itemsPerPage,
                        (activeTable + 1) * itemsPerPage,
                      )
                      .map((user, index) => (
                        <tr key={index} onClick={() => handleRowClick(user)}>
                          <td>{user.id}</td>
                          <td>
                            {user.first_name} {user.last_name}
                          </td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.created_at}</td>
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
                  {startIndex}-{endIndex} of {totalItems} items
                </div>
              </div>
            </>
          ) : (
            <p>No data available.</p>
          )}
        </>
      )}

      {/* Modal for showing user details */}
      <Modal
        isOpen={!!selectedUser && !showConfirmDelete}
        onRequestClose={handleCloseModal}
        contentLabel="User Details"
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
        {selectedUser && (
          <div>
            <h3>User Details</h3>
            <p>
              <strong>Name:</strong> {selectedUser.first_name}{" "}
              {selectedUser.last_name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>ID:</strong> {selectedUser.id}
            </p>
            <p>
              <strong>Created At:</strong> {selectedUser.created_at}
            </p>
            <p>
              <strong>Updated At:</strong> {selectedUser.updated_at}
            </p>
            <p>
              <strong>Deleted At:</strong> {selectedUser.deleted_at}
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
                Delete User
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
          <p>Are you sure you want to delete this user?</p>
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
              onClick={handleDeleteUser}
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

export default FetchData;
