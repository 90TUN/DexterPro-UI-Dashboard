import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

// Setting the app element for accessibility
Modal.setAppElement('#root');

function FetchOrders() {
  const [tableData, setTableData] = useState([]);
  const [activeTable, setActiveTable] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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
          const url = `https://api.getdexterapp.com/api/backoffice/orders?page=${currentPage}`;
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
    setActiveTable((prev) => (prev - 1 >= 0 ? prev - 1 : Math.ceil(filteredData.length / itemsPerPage) - 1));
  };

  const goToNextPage = () => {
    setActiveTable((prev) => (prev + 1) % Math.ceil(filteredData.length / itemsPerPage));
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setActiveTable(0); // Reset to the first page on search
  };

  const filteredData = tableData.filter((data) => {
    const idString = String(data.id); // Convert data.id to a string
    const referenceString = String(data.reference); // Convert data.reference to a string
    return (
      idString.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.payment_status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referenceString.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const startIndex = activeTable * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div
      className="Container fetch"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by ID..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc', marginTop:"30px" }}
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
                      <th>ID</th>
                      <th>Reference</th>
                      <th>Payment-Status</th>
                      <th>Payment Method</th>
                      <th>Subtotal Amount</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData
                      .slice(startIndex, endIndex)
                      .map((data, index) => (
                        <tr key={index} onClick={() => handleRowClick(data)}>
                          <td>
                            {data.id} 
                          </td>
                          <td>{data.reference}</td>
                          <td>{data.payment_status}</td>
                          <td>{data.payment_method}</td>
                          <td>{data.subtotal_amount}</td>
                          <td>{data.total_amount}</td>
                          <td>{data.status}</td>
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

      {/* Modal for showing vendor details */}
      <Modal
        isOpen={!!selectedOrder}
        onRequestClose={handleCloseModal}
        contentLabel="Vendor Details"
       
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            width: '600px',
            height: '600px',
            overflow:'scroll',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
          },
        }}
      >
        {selectedOrder && (
          <div>
            <h2 style={{backgroundColor:"#3a5743", width:"fit-content", padding:"5px",color:"white", borderRadius:"5px"}}>Order Info</h2>
            <br/>
            <h3>User</h3>
            <p><strong>ID:</strong> {selectedOrder.user.id}</p>
            <p><strong>Name:</strong> {selectedOrder.user.first_name} {selectedOrder.user.last_name}</p>
            <br/>
            <h3>Shop</h3>
            <p><strong>ID:</strong> {selectedOrder.shop.id}</p>
            <p><strong>Name:</strong> {selectedOrder.shop.name}</p>
            <br/>
            <h3>Order Details</h3>
            <p><strong>ID:</strong> {selectedOrder.id}</p>
            <p><strong>Reference:</strong> {selectedOrder.reference} {selectedOrder.last_name}</p>
            <p><strong>Payment Status:</strong> {selectedOrder.payment_status}</p>
            <p><strong>Address ID:</strong> {selectedOrder.address_id}</p>
            <p><strong>Subtotal Amount:</strong> {selectedOrder.subtotal_amount}</p>
            <p><strong>Discount Amount:</strong> {selectedOrder.discount_amount}</p>
            <p><strong>Tax Amount:</strong> {selectedOrder.tax_amount}</p>
            <p><strong>Total Amount:</strong> {selectedOrder.total_amount}</p>
            <p><strong>Shipping Cost:</strong> {selectedOrder.shipping_cost}</p>
            <p><strong>Notes:</strong> {selectedOrder.notes}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.payment_method}</p>
            <p><strong>Fulfilled At:</strong> {selectedOrder.fulfilled_at}</p>
            <p><strong>Created At:</strong> {selectedOrder.created_at}</p>
            <p><strong>Updated At:</strong> {selectedOrder.updated_at}</p>
            <p><strong>Deleted At:</strong> {selectedOrder.deleted_at}</p>

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
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FetchOrders;
