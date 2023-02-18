import axios, { AxiosResponse } from "axios";
import CreateAula from "../models/Curso/Aula/CreateAula";
import UpdateAula from "../models/Curso/Aula/UpdateAula";
import { baseUrl, buildHeader } from "./http";
import UploadVideoAula from "../models/Curso/Aula/UploadVideoAula";
import UpdateAulaUrl from "../models/Curso/Aula/UpdateAulaUrl";
import { getAsByteArray } from "../assets/scripts/fileToBuffer";
import { ACCESS_KEY, BUNNY_BASE_URL, BUNNY_HEADERS, LIBRARY_ID } from "./bunnyIntegration";
import ListarAulas from "../models/Curso/Aula/ListarAulas";
import { convertIntoMinutes, isNull } from "../assets/scripts/base";
import { obterCursoById } from "./cursosApi";
import fs from "fs";
import Curso from "../models/Curso/Curso";
import UpdateCollectionCurso from "../models/Curso/UpdateCollectionCurso";

const getAulaById: (id_aula: string) => Promise<AxiosResponse<ListarAulas>> = (id_aula: string ) => {
    const url = baseUrl + "/aulas/" + id_aula;
    return axios.get<ListarAulas>(url, buildHeader());
}

const inserirAula = (aula: CreateAula) => {
    const url = baseUrl + "/aulas";
    return axios.post(url, aula);
};

const updateAulaUrl = (urlModel: UpdateAulaUrl) => {
    const url = baseUrl + "/aulas/" + urlModel._id;
    return axios.put(url, urlModel);
};

const alterarAula = (aula: UpdateAula) => {
    const url = baseUrl + "/aulas/" + aula._id;
    return axios.put(url, aula);
};

const removerAula = (aula: ListarAulas) => {
    if(aula.idVideoAula)
        removeVideo(aula.idVideoAula);

    const url = baseUrl + "/aulas/" + aula._id;
    return axios.delete(url);
};

const updateCursoCollection = async (id_curso: string, collectionId: string) => {
    const url = baseUrl + "/cursos/" + id_curso;
    const updateCollection: UpdateCollectionCurso = {
        idCollection: collectionId
    };

    return axios.put(url, updateCollection, buildHeader());
}

const enviarAulaVideo = async (file: any, aulaDetalhes: ListarAulas, duration: string) => {
    const cursoResponse = await obterCursoById(aulaDetalhes?.idCurso);
    const cursoDetalhes = cursoResponse.data;

    if(!cursoDetalhes.idCollection) {
        console.log("entrei",cursoDetalhes.idCollection);
        const collectionResponse = await createCollection(cursoDetalhes.nome);
        const collectionDetalhes = collectionResponse.data;
        const updateCursoCollectionResponse = await updateCursoCollection(aulaDetalhes.idCurso, collectionDetalhes.guid);
        aulaDetalhes.idCollection = collectionDetalhes.guid;
    }
    
    if(!aulaDetalhes.idCollection)
        aulaDetalhes.idCollection = cursoDetalhes.idCollection;
    
    
    if(aulaDetalhes?.idVideoAula) {
        await removeVideo(aulaDetalhes.idVideoAula);
    }
    

    const videoResponse = await createVideo(aulaDetalhes.descricao, aulaDetalhes.idCollection);
    const videoDetalhes = videoResponse.data;

    aulaDetalhes.idVideoAula = videoDetalhes.guid;
    aulaDetalhes.url = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${aulaDetalhes.idVideoAula}?autoplay=true`;


    const uploadResponse = await uploadVideoAula(aulaDetalhes.idVideoAula, file);
    if(uploadResponse.data.success) {
        const aulaUpdateUrl : UpdateAulaUrl = {
            _id: aulaDetalhes._id,
            idCollection: aulaDetalhes.idCollection,
            idVideoAula: aulaDetalhes.idVideoAula,
            url: aulaDetalhes.url,
            duration: convertIntoMinutes(duration)
        };
        const aulaUpdatedResponse = await updateAulaUrl(aulaUpdateUrl);
        if(aulaUpdatedResponse) {
            aulaDetalhes = aulaUpdatedResponse.data as ListarAulas;
        }
    }

    return aulaDetalhes as ListarAulas;
}

const uploadVideoAula = async (id_video, buffer) => {
    const url = BUNNY_BASE_URL + "/library/" + LIBRARY_ID + "/videos/" + id_video +  "?enabledResolutions=1080p,720p,480p";
    return axios.put(url, buffer, {
        headers: BUNNY_HEADERS
    });
};

const removeVideo = async (id_video: string ) => {
    const url = BUNNY_BASE_URL + "/library/" + LIBRARY_ID + "/videos/" + id_video;
    return axios.delete(url, {
        headers: BUNNY_HEADERS
    });
}

const createVideo = async (nome: string, collectionId: string) => {
    const url = BUNNY_BASE_URL + "/library/" + LIBRARY_ID + "/videos";
    return axios.post(url, {
        "title": nome,
        "collectionId": collectionId
    }, {
        headers: BUNNY_HEADERS
    });
}

const createCollection = async (nome_curso: string) => {
    const url = BUNNY_BASE_URL + "/library/" + LIBRARY_ID + "/collections";
    return axios.post(url, {
        "name": nome_curso
    }, {
        headers: BUNNY_HEADERS
    });
}


export {
    inserirAula,
    alterarAula,
    removerAula,
    uploadVideoAula,
    updateAulaUrl,
    enviarAulaVideo,
};
