import axios from "axios";
import CreateModulo from "../models/Curso/Modulo/CreateModulo";
import UpdateModulo from "../models/Curso/Modulo/UpdateModulo";
import { baseUrl } from "./http";

const listarModulosPorCurso = (curso: string) => {
    const url = baseUrl + "/modulos/" + curso;
    return axios.get(url);
};

const inserirModulo = (modulo: CreateModulo) => {
    const url = baseUrl + "/modulos";
    return axios.post(url, modulo);
};

const alterarModulo = (modulo: UpdateModulo) => {
    const url = baseUrl + "/modulos/" + modulo._id;
    return axios.put(url, modulo);
};

const removerModulo = (modulo: string) => {
    const url = baseUrl + "/modulos/" + modulo;
    return axios.delete(url);
};

export { listarModulosPorCurso, inserirModulo, alterarModulo, removerModulo };
