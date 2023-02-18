import axios from "axios";
import AccountPut from "../models/Conta/AccountPut";
import Login from "../models/Conta/Login";
import Register from "../models/Conta/Register";
import { baseUrl, buildHeader } from "./http";

const register = (conta: Register) => {
    const url = baseUrl + "/register";
    return axios.post(url, conta);
};

const login = (login: Login) => {
    const url = baseUrl + "/login";
    return axios.post(url, login);
};

const logout = (context) => {
    const { setConta } = context;
    setConta(null);
    localStorage.removeItem("user");
};

const obterContaDetalhes = (conta: string) => {
    const url = baseUrl + "/conta/" + conta;
    return axios.get(url, buildHeader());
};

const alterarConta = (conta: string, alteracao: AccountPut) => {
    const url = baseUrl + "/alterar_conta/" + conta;
    return axios.put(url, alteracao, buildHeader());
};

export { register, login, logout, obterContaDetalhes, alterarConta };
