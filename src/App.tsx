import "./App.scss";
import React, { useMemo, useState } from "react";
import Footer from "./components/Footer/index";
import NavBar from "./components/NavBar/index";
import PageContent from "./components/PageContent";
import { BrowserRouter as Router } from "react-router-dom";
import LoggedUser from "./models/Conta/LoggedUser";
import { MyGlobalContext } from "./context/ContaContext";
import ModalNotify from "./components/Modal/Notify";
import { MyModalContext, useModalContext } from "./context/ModalContext";
import ModalConfirm from "./components/Modal/Confirm";

function App() {
    // const teste3 : TipoConta = {
    //   _id: "38743",
    //   descricao: "Admin"
    // };

    // const teste2 : Account = {
    //   _id: "314983",
    //   nome: "admin",
    //   email: "admin",
    //   senha: "admin",
    //   tipo: teste3
    // }

    // const teste : LoggedUser = {
    //   token: "1328743843",
    //   conta: teste2
    // };
    const contaLocalStorage = JSON.parse(
        localStorage.getItem("user") as string
    );

    const [conta, setConta] = useState<LoggedUser | null>(contaLocalStorage);

    const valueProvider = useMemo(
        () => ({ conta, setConta }),
        [conta, setConta]
    );

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [openedModal, setOpenedModal] = useState(false);
    const [type, setType] = useState("");
    const [callback, setCallback] = useState<() => void>(() => () => console.log("Oi gente"));
    

    const modalProvider = useMemo(
        () => ({
            title,
            setTitle,
            message,
            setMessage,
            openedModal,
            setOpenedModal,
            type,
            setType,
            callback,
            setCallback
        }),
        [title, setTitle, message, setMessage, openedModal, setOpenedModal, type, setType, callback, setCallback]
    );

    return (
        <Router>
            <div className="App" id="App">
                <MyGlobalContext.Provider value={valueProvider}>
                    <MyModalContext.Provider value={modalProvider}>
                        <ModalConfirm/>
                        <ModalNotify />

                        <NavBar />
                        <PageContent />
                        <Footer />
                    </MyModalContext.Provider>
                </MyGlobalContext.Provider>
            </div>
        </Router>
    );
}

export default App;
