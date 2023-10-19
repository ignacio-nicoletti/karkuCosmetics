import React, { useEffect, useState } from "react";
import { getSales, updateSalesById } from "../../../../functions/fetchingSales";
import "./SalesManagement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { GetDecodedCookie } from "../../../../utils/DecodedCookie";
import SelectStatusSales from "../../../SelectStatusSales/SelectStatusSales";

const SalesManagement = ({ setSection }) => {
  const [sales, setSales] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const token = GetDecodedCookie("cookieToken");

  const filterSales = () => {
    return sales.filter((sale) => {
      const nameMatch =
        !nameFilter ||
        (sale.payer &&
          (sale.payer.name + " " + sale.payer.lastName)
            .toLowerCase()
            .includes(nameFilter.toLowerCase()));
      const dateMatch =
        !dateFilter ||
        (sale.methodPay &&
          sale.methodPay.datePay &&
          formatDateModal(sale.methodPay.datePay).includes(dateFilter));

      return nameMatch && dateMatch;
    });
  };

  useEffect(() => {
    getSales(token)
      .then((data) => setSales(data.orders.reverse()))
      .catch((error) => console.error("Error fetching sales:", error));
  }, []);

  const formatDateModal = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const openSaleDetailsModal = (sale) => {
    setSelectedSale(sale);
    setSelectedStatus(sale.detailPay.status);
  };

  const closeSaleDetailsModal = () => {
    setSelectedSale(null);
  };

  const updateStatus = () => {
    if (selectedSale && selectedStatus) {
      const updateValue = selectedStatus;

      updateSalesById(selectedSale.id, updateValue, token)
        .then((updatedSale) => {
          const updatedSales = sales.map((sale) =>
            sale.id === updatedSale.id ? updatedSale : sale
          );
          setSales(updatedSales);
        })
        .catch((error) => console.error("Error updating sale status:", error));
    }
  };

  const filteredSales = filterSales();

  const productsPerPage = 15;
  const totalPages = Math.ceil(filteredSales.length / productsPerPage);
  let clampedCurrentPage = currentPage;

  if (totalPages === 0) {
    clampedCurrentPage = 1;
  } else if (clampedCurrentPage > totalPages) {
    clampedCurrentPage = totalPages;
  }

  const indexOfLastSale = clampedCurrentPage * productsPerPage;
  const indexOfFirstSale = indexOfLastSale - productsPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  const isNextButtonDisabled = clampedCurrentPage >= totalPages;

  return (
    <div className="sales-container">
      <div className="back-product-btn-container">
        <button className="back-product-btn" onClick={() => setSection("Home")}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="h2-container-title-sales">
        <h2>Ventas</h2>
        <div className="filters-sales">
          <input
            type="text"
            placeholder="Buscar por nombre o apellido..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="DD/MM/AAAA"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="sales-list">
        {currentSales.map((sale, index) => (
          <div className="sale-container" key={index}>
            <p>
              <strong>Nombre: </strong>
              {sale.payer.name}
              <br />
              <strong>Apellido: </strong>
              {sale.payer.lastName}
            </p>

            <p>
              <strong>Total: </strong>$ {sale.methodPay?.total}
            </p>

            <p>
              <strong>Estado: </strong>
              {sale.detailPay?.status}
            </p>

            <p>
              <strong>Fecha: </strong>
              {formatDateModal(sale.methodPay?.datePay)}
            </p>
            <button
              className="btn-showSale"
              onClick={() => openSaleDetailsModal(sale)}
            >
              Ver detalle
            </button>
          </div>
        ))}
      </div>

      {selectedSale && (
        <div className="modal-sales">
          <div className="modal-content-sales">
            <div className="back-btn-sale-container">
              <p>
                <strong>Venta N° :</strong> {selectedSale.id}
              </p>
              <button
                className="back-product-btn-modal"
                onClick={closeSaleDetailsModal}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <p>
              Nombre: {selectedSale.payer.name} {selectedSale.payer.lastName}
            </p>
            <div>
              <p>
                <strong>Productos:</strong>
              </p>
              {selectedSale.detailPay.items.map((el) => (
                <p>{el.title}</p>
              ))}
            </div>
            <p>Total: ${selectedSale.methodPay.total}</p>
            <p>Fecha: {formatDateModal(selectedSale.methodPay.datePay)}</p>

            <label>
              <strong>Estado:</strong>
              <SelectStatusSales
                options={["Pendiente", "En preparación", "Finalizada"]}
                selectedOption={selectedStatus}
                setSelectedOption={setSelectedStatus}
              />
            </label>
            <button onClick={updateStatus}>Guardar Cambios</button>
          </div>
        </div>
      )}
      <div className="pagination-productManagement">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination-productManagement-info">
          {clampedCurrentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={isNextButtonDisabled}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default SalesManagement;
