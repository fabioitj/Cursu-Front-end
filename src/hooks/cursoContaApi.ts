import ComprarCurso from "../models/CursoConta/ComprarCurso";
import { baseUrl, buildHeader } from "./http";
import axios from "axios";
import { useGlobalContext } from "../context/ContaContext";

const comprarCurso = (curso: ComprarCurso) => {
    const url = baseUrl + "/meus_cursos";
    return axios.post(url, curso, buildHeader());
};

const listarMeusCursos = (conta: string) => {
    const url = baseUrl + "/meus_cursos/" + conta;
    return axios.get(url, buildHeader());
};

const validarCursoByConta: any = (conta: string, curso: string) => {
    const url = baseUrl + "/meus_cursos/validar_curso/" + conta + "?c=" + curso;
    return axios.get(url, buildHeader());
};

export { comprarCurso, listarMeusCursos, validarCursoByConta };
