import axios from "axios";
import { baseUrl } from "./http";

const listarTiposConta: any = () => {
    const url = baseUrl + "/tipo_conta";
    return axios.get(url);
};

export { listarTiposConta };
