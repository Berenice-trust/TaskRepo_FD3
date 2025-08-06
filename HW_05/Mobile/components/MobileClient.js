import React from "react";
import PropTypes from "prop-types";
import eventEmitter from "./EventEmitter";

class MobileClient extends React.PureComponent {
  state = { editing: false };

  famRef = React.createRef();
  imRef = React.createRef();
  otchRef = React.createRef();
  balanceRef = React.createRef();

  startEdit = () => this.setState({ editing: true });

  saveEdit = () => {
    const updatedClient = {
      ...this.props.client,
      fam: this.famRef.current.value,
      im: this.imRef.current.value,
      otch: this.otchRef.current.value,
      balance: Number(this.balanceRef.current.value),
    };
    eventEmitter.emit("editClient", updatedClient);
    this.setState({ editing: false });
  };

  cancelEdit = () => this.setState({ editing: false });

  render() {
    console.log(
      "MobileClient render",
      this.props.client.id,
      this.props.client.fam,
    );
    const { client, isNew, onSave, onCancel } = this.props;
    const { editing } = this.state;

    // Режим добавления нового клиента
    if (isNew) {
      return (
        <tr>
          <td>
            <input
              className="edit-input"
              ref={this.famRef}
              placeholder="Фамилия"
            />
          </td>
          <td>
            <input className="edit-input" ref={this.imRef} placeholder="Имя" />
          </td>
          <td>
            <input
              className="edit-input"
              ref={this.otchRef}
              placeholder="Отчество"
            />
          </td>
          <td>
            <input
              className="edit-input"
              type="number"
              ref={this.balanceRef}
              placeholder="Баланс"
            />
          </td>
          <td></td>
          <td className="button-group">
            <button
              className="edit-btn"
              onClick={() => {
                const newClient = {
                  id: client.id,
                  fam: this.famRef.current.value,
                  im: this.imRef.current.value,
                  otch: this.otchRef.current.value,
                  balance: Number(this.balanceRef.current.value),
                };
                onSave(newClient);
              }}
            >
              ✅
            </button>
            <button className="delete-btn" onClick={onCancel}>
              ❌
            </button>
          </td>
          <td></td>
        </tr>
      );
    }

    // обычный режим отображения клиента
    return (
      <tr>
        <td>
          {editing ? (
            <input
              className="edit-input"
              defaultValue={client.fam}
              ref={this.famRef}
            />
          ) : (
            client.fam
          )}
        </td>
        <td>
          {editing ? (
            <input
              className="edit-input"
              defaultValue={client.im}
              ref={this.imRef}
            />
          ) : (
            client.im
          )}
        </td>
        <td>
          {editing ? (
            <input
              className="edit-input"
              defaultValue={client.otch}
              ref={this.otchRef}
            />
          ) : (
            client.otch
          )}
        </td>
        <td>
          {editing ? (
            <input
              className="edit-input"
              defaultValue={client.balance}
              ref={this.balanceRef}
            />
          ) : (
            client.balance
          )}
        </td>
        <td>
          <span
            className={client.balance >= 0 ? "status-active" : "status-blocked"}
          >
            {client.balance >= 0 ? "active" : "blocked"}
          </span>
        </td>
        <td className="button-group">
          {editing ? (
            // обертка кнопок в React.Fragment
            <>
              <button className="edit-btn" onClick={this.saveEdit}>
                ✅
              </button>
              <button className="delete-btn" onClick={this.cancelEdit}>
                ❌
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={this.startEdit}>
              Редактировать
            </button>
          )}
        </td>
        <td>
          <button
            className="delete-btn"
            onClick={() => {
              if (window.confirm("Удалить клиента?")) {
                eventEmitter.emit("deleteClient", client.id);
              }
            }}
          >
            Удалить
          </button>
        </td>
      </tr>
    );
  }
}

MobileClient.propTypes = {
  client: PropTypes.object.isRequired,
};

export default MobileClient;
