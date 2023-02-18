import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/ContaContext";
import { login, register } from "../../hooks/contasApi";
import { listarTiposConta } from "../../hooks/tipoContaApi";
import Login from "../../models/Conta/Login";
import Register from "../../models/Conta/Register";
import TipoConta from "../../models/TipoConta";
import Field from "../../components/Field";
import "./style.scss";
import SelectBox from "../../components/SelectBox";
import { useModalContext } from "../../context/ModalContext";
import { notify } from "../../assets/scripts/modal";

function RegistrarPage() {
    const navigate = useNavigate();

    const { conta, setConta } = useGlobalContext();

    const { setTitle, setMessage, setType, setOpenedModal, callback, setCallback } = useModalContext();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [tipoConta, setTipoConta] = useState("");
    const [tiposConta, setTiposConta] = useState<TipoConta[]>();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const conta: Register = {
            nome: nome,
            email: email,
            senha: senha,
            confirmaSenha: confirmarSenha,
            tipo: tipoConta,
        };

        // register(conta).then((response) => {
        //     if (response.data && response.data.itens) {
        //         notify(
        //             "Validação",
        //             response.data.itens.join("&space"),
        //             setTitle,
        //             setMessage,
        //             setOpenedModal
        //         );
        //     } else if (response.data) {
        //         notify(
        //             "Sucesso",
        //             "Conta criada com sucesso!",
        //             setTitle,
        //             setMessage,
        //             setOpenedModal
        //         );
        //         navigate("/");
        //     }
        // });

        callback();
    };

    useEffect(() => {
        listarTiposConta().then(
            (response) => response.data && setTiposConta(response.data)
        );
    }, []);

    return (
        <div className="register">
            <div className="register-box">
                <div className="register-box-header">
                    <h3 className="register-box-header-title">Bem-vindo</h3>
                </div>
                <div className="register-box-body">
                    <form role="form" onSubmit={handleSubmit}>
                        <SelectBox
                            list={tiposConta}
                            value={tipoConta}
                            setValue={setTipoConta}
                        />

                        <Field
                            placeholder="Digite o seu nome"
                            type="text"
                            value={nome}
                            setValue={setNome}
                        />
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
                        <Field
                            placeholder="Confirmação de senha"
                            type="password"
                            value={confirmarSenha}
                            setValue={setConfirmarSenha}
                        />

                        <button className="register-box-body-button">
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrarPage;
