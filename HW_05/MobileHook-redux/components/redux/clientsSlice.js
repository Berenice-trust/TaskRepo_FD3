const LOAD_START = "clients/load_start";
const LOAD_SUCCESS = "clients/load_success";
const LOAD_ERROR = "clients/load_error";

const initialState = {
  companyName: "",
  clients: [],
  loading: false,
  error: null,
};

export default function clientsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_START:
      return { ...state, loading: true, error: null };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        companyName: action.payload.companyName,
        clients: action.payload.clientsArr || [],
      };
    case LOAD_ERROR:
      return { ...state, loading: false, error: action.payload, clients: [] };
    case "clients/delete":
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== action.payload),
      };
    case "clients/edit":
      return {
        ...state,
        clients: state.clients.map((client) =>
          client.id === action.payload.id ? action.payload : client,
        ),
      };
    case "clients/add":
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    default:
      return state;
  }
}

// Action creators
export const loadClientsStart = () => ({ type: LOAD_START });
export const loadClientsSuccess = (data) => ({
  type: LOAD_SUCCESS,
  payload: data,
});
export const loadClientsError = (err) => ({
  type: LOAD_ERROR,
  payload: err,
});
export const deleteClientAction = (id) => ({
  type: "clients/delete",
  payload: id,
});
export const editClientAction = (updatedClient) => ({
  type: "clients/edit",
  payload: updatedClient,
});
export const addClientAction = (newClient) => ({
  type: "clients/add",
  payload: newClient,
});

// Thunk для асинхронной загрузки клиентов и названия компании
export const fetchClients = () => async (dispatch) => {
  dispatch(loadClientsStart());
  try {
    const response = await fetch(
      "https://fe.it-academy.by/Examples/mobile_company.json",
    );
    const data = await response.json();
    console.log("Загружено:", data);
    dispatch(loadClientsSuccess(data));
  } catch (err) {
    dispatch(loadClientsError(err.toString()));
  }
};
