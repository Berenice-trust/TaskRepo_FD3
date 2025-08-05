import React from "react";
import "./styles.scss";
import FilterButtons from "./FilterButtons";
import MobileClient from "./MobileClient";

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
          onFilterChange={(filter) => this.setState({ Filter: filter })}
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
          </tbody>
        </table>
      </div>
    );
  }
}

export default MobileCompany;
