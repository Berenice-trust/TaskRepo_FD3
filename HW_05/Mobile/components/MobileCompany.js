import React from "react";
import "./styles.scss";

class MobileCompany extends React.PureComponent {
    state = {
        clients: [
        {id: 1, fam: "Иванов", im: "Иван", otch: "Иванович", balance: 200},
        {id: 2, fam: "Сидоров", im: "Сидор", otch: "Сидорович", balance: 250},
        {id: 3, fam: "Петров", im: "Пётр", otch: "Петрович", balance: 180},
        {id: 4, fam: "Григорьев", im: "Григорий", otch: "Григорьевич", balance: -220},
        ],
        Filter: "all", // all | active | blocked
    };
   render() {
    console.log("MobileCompany render");

    // фильтрация клиентов
      let filteredClients = this.state.clients;
    if (this.state.Filter === "active") {
        filteredClients = filteredClients.filter(c => c.balance >= 0);
    }
    if (this.state.Filter === "blocked") {
        filteredClients = filteredClients.filter(c => c.balance < 0);
    }





    return (
      <div>
        <h2>Мобильная компания</h2>

        <div className="filter-buttons">
        <button
            className="filter-btn"
            onClick={() => this.setState({ Filter: "all" })}
            disabled={this.state.Filter === "all"}
        >Все</button>
        <button
            className="filter-btn"
            onClick={() => this.setState({ Filter: "active" })}
            disabled={this.state.Filter === "active"}
        >Активные</button>
        <button
            className="filter-btn"
            onClick={() => this.setState({ Filter: "blocked" })}
            disabled={this.state.Filter === "blocked"}
        >Заблокированные</button>
        </div>




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

            {filteredClients.map(client =>
              <tr key={client.id}>
                <td>{client.fam}</td>
                <td>{client.im}</td>
                <td>{client.otch}</td>
                <td>{client.balance}</td>
                <td>
                  <span className={client.balance >= 0 ? "status-active" : "status-blocked"}>
                    {client.balance >= 0 ? "active" : "blocked"}
                  </span>
                </td>
                <td>
                  <button className="edit-btn">Редактировать</button>
                </td>
                <td>
                  <button className="delete-btn">Удалить</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MobileCompany;