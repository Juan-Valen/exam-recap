import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AuthContextProvider from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthContextProvider >
        <App />
    </AuthContextProvider >
);
