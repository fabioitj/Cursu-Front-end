import axios, { AxiosResponse } from "axios";
import CreateCurso from "../models/Curso/CreateCurso";
import Curso from "../models/Curso/Curso";
import UpdateCurso from "../models/Curso/UpdateCurso";
import { baseUrl, buildHeader } from "./http";

const listarCursosComFiltro: any = () => {
    const url = baseUrl + `/cursos`;
    return axios.get(url);
};

const listarCursosAdicionadosRecentemente: any = () => {
    const url = baseUrl + "/cursos";
    return axios.get(url);
};

const listarCursosPorProfessor = (professor: string) => {
    const url = baseUrl + "/cursos/listarPorProfessor/" + professor;
    return axios.get(url);
};

const obterCursoById: (id: any) => Promise<AxiosResponse<Curso>> = (id: any) => {
    const url = baseUrl + "/cursos/" + id;
    return axios.get(url);
};

const criarCurso = (curso: CreateCurso) => {
    const url = baseUrl + "/cursos";
    return axios.post(url, curso, buildHeader());
};

const alterarCurso = (curso: UpdateCurso) => {
    const url = baseUrl + "/cursos/" + curso._id;
    return axios.put(url, curso, buildHeader());
};

export {
    listarCursosAdicionadosRecentemente,
    obterCursoById,
    listarCursosComFiltro,
    listarCursosPorProfessor,
    criarCurso,
    alterarCurso,
};
