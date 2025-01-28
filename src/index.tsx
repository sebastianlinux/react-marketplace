import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import MainLayout from "Layouts/MainLayout";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    
        <App />
     
    </PersistGate>
  </Provider>
);
