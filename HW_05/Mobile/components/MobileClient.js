import React from "react";
import PropTypes from "prop-types";

class MobileClient extends React.PureComponent {
  render() {
    console.log("MobileClient render");
    const { client } = this.props;

    return (
      <tr>
        <td>{client.fam}</td>
        <td>{client.im}</td>
        <td>{client.otch}</td>
        <td>{client.balance}</td>
        <td>
          <span
            className={client.balance >= 0 ? "status-active" : "status-blocked"}
          >
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
    );
  }
}

MobileClient.propTypes = {
  client: PropTypes.object.isRequired,
};

export default MobileClient;
