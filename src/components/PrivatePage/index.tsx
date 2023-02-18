import { Navigate, Route } from "react-router-dom";
import { useGlobalContext } from "../../context/ContaContext";
import LoginPage from "../../pages/LoginPage";
import "./style.scss";

function PrivatePage({children}) {
    const {conta} = useGlobalContext();
    
    if(conta) {
        return children;
    }
    else {
        return <Navigate to={"/entrar"}/>;
    }
}

export default PrivatePage;