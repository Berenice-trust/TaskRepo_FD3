import React from "react";
import "./styles.scss";
import FilterButtons from "./FilterButtons";
import MobileClient from "./MobileClient";
import eventEmitter from "./EventEmitter"; // импортируем EventEmitter

class MobileCompany extends React.PureComponent {
  state = {
    clients: [
      { id: 1, fam: "Иванов", im: "Иван", otch: "Иванович", balance: 200 },
      { id: 2, fam: "Сидоров", im: "Сидор", otch: "Сидорович", balance: 250 },
      { id: 3, fam: "Петров", im: "Пётр", otch: "Петрович", balance: 180 },
      {
        id: 4,
        fam: "Григорьев",
        im: "Григорий",
        otch: "Григорьевич",
        balance: -220,
      },
    ],
    Filter: "all", // all | active | blocked
    adding: false,
  };

  setFilter = (filter) => {
    this.setState({ Filter: filter });
  };

  // подписывание на событие удаления клиента
  componentDidMount() {
    eventEmitter.on("deleteClient", this.deleteClient);
    eventEmitter.on("editClient", this.editClient);
  }

  // отписывание от события при размонтировании компонента
  componentWillUnmount() {
    eventEmitter.off("deleteClient", this.deleteClient);
    eventEmitter.off("editClient", this.editClient);
  }

  deleteClient = (id) => {
    const client = this.state.clients.find((client) => client.id === id);
    console.log(
      "Удаление клиента с id:",
      id,
      client ? client.fam : "Неизвестный",
    );
    const newClients = this.state.clients.filter((client) => client.id !== id);
    this.setState({ clients: newClients });
  };

  // обработчик события редактирования
  editClient = (updatedClient) => {
    const newClients = this.state.clients.map((client) =>
      client.id === updatedClient.id ? updatedClient : client,
    );
    this.setState({ clients: newClients });
  };

  startAddClient = () => {
    this.setState({ adding: true });
  };

  cancelAddClient = () => {
    this.setState({ adding: false });
  };

  addClient = (newClient) => {
    console.log("Добавлен клиент: id =", newClient.id, newClient.fam);
    const newClients = [...this.state.clients, newClient];
    this.setState({ clients: newClients, adding: false });
  };

  render() {
    console.log("MobileCompany render");

    // фильтрация клиентов
    let filteredClients = this.state.clients;
    if (this.state.Filter === "active") {
      filteredClients = filteredClients.filter((c) => c.balance >= 0);
    }
    if (this.state.Filter === "blocked") {
      filteredClients = filteredClients.filter((c) => c.balance < 0);
    }

    return (
      <div>
        <h2>Мобильная компания</h2>

        <FilterButtons
          currentFilter={this.state.Filter}
          onFilterChange={this.setFilter}
        />

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
            {this.state.adding && (
              <MobileClient
                client={{
                  id: Math.max(0, ...this.state.clients.map((c) => c.id)) + 1,
                  fam: "",
                  im: "",
                  otch: "",
                  balance: 0,
                }}
                isNew={true}
                onSave={this.addClient}
                onCancel={this.cancelAddClient}
              />
            )}
          </tbody>
        </table>
        <button className="edit-btn" onClick={this.startAddClient}>
          Добавить клиента
        </button>
      </div>
    );
  }
}

export default MobileCompany;
