import axios from "axios";
import { baseUrl } from "./http";

const listarCategorias = () => {
    const url = baseUrl + "/categorias";
    return axios.get(url);
};

export { listarCategorias };
