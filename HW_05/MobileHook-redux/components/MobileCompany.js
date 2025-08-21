import React, { useState, useEffect } from "react";
import "./styles.scss";
import FilterButtons from "./FilterButtons";
import MobileClient from "./MobileClient";
import eventEmitter from "./EventEmitter"; // импортируем EventEmitter
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClients,
  deleteClientAction,
  editClientAction,
  addClientAction,
} from "./redux/clientsSlice";

function MobileCompany() {
  const { companyName, clients = [], loading, error } = useSelector(
    (state) => state.clients,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const [filter, setFilter] = useState("all"); // all | active | blocked
  const [adding, setAdding] = useState(false);

  const startAddClient = () => setAdding(true);
  const cancelAddClient = () => setAdding(false);

  const deleteClient = (id) => dispatch(deleteClientAction(id));
  const editClient = (updatedClient) =>
    dispatch(editClientAction(updatedClient));
  const addClient = (newClient) => {
    dispatch(addClientAction(newClient));
    setAdding(false);
  };

  useEffect(() => {
    eventEmitter.on("deleteClient", deleteClient);
    eventEmitter.on("editClient", editClient);
    return () => {
      eventEmitter.off("deleteClient", deleteClient);
      eventEmitter.off("editClient", editClient);
    };
  }, [deleteClient, editClient]);

  console.log("MobileCompany render");

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  // фильтрация клиентов
 let filteredClients = clients;
  if (filter === "active") {
    filteredClients = filteredClients.filter((c) => c.balance >= 0);
  }
  if (filter === "blocked") {
    filteredClients = filteredClients.filter((c) => c.balance < 0);
  }

  return (
    <div>
      <h2>{companyName || "Мобильная компания"}</h2>

      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

      <table className="MobileCompany-table">
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Редактировать</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <MobileClient key={client.id} client={client} />
          ))}
          {adding && (
            <MobileClient
              client={{
                id: Math.max(0, ...clients.map((c) => c.id)) + 1,
                fam: "",
                im: "",
                otch: "",
                balance: 0,
              }}
              isNew={true}
              onSave={addClient}
              onCancel={cancelAddClient}
            />
          )}
        </tbody>
      </table>
      <button className="edit-btn" onClick={startAddClient}>
        Добавить клиента
      </button>
    </div>
  );
}

export default MobileCompany;
