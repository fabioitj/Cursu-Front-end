import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/ContaContext";
import { login } from "../../hooks/contasApi";
import Login from "../../models/Conta/Login";
import Field from "../../components/Field";
import "./style.scss";
import { useModalContext } from "../../context/ModalContext";
import { notify } from "../../assets/scripts/modal";

function LoginPage() {
    const { setConta } = useGlobalContext();

    const { setOpenedModal, setTitle, setType, setMessage } = useModalContext();

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginAccount: Login = {
            email: email,
            senha: senha,
        };

        login(loginAccount).then((response) => {
            if (response.data && response.data.token) {
                setConta(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/");
            } else if (response.data && response.data.itens) {
                notify(
                    "Validação",
                    response.data.itens.join("&space"),
                    setTitle,
                    setMessage,
                    setType,
                    setOpenedModal
                );
            }
        });
    };

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <div className="login">
            <div className="login-box">
                <div className="login-box-header">
                    <h3 className="login-box-header-title">Bem-vindo</h3>
                </div>
                <div className="login-box-body">
                    <form role="form" onSubmit={handleSubmit}>
                        <Field
                            placeholder="Digite o seu e-mail"
                            type="email"
                            value={email}
                            setValue={setEmail}
                        />
                        <Field
                            placeholder="Digite a sua senha"
                            type="password"
                            value={senha}
                            setValue={setSenha}
                        />

                        <button className="login-box-body-button">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
