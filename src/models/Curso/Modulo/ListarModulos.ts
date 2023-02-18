import ListarAulas from "../Aula/ListarAulas";
import Curso from "../Curso";

interface ListarModulos {
    _id: string;
    descricao: string;
    aulas: ListarAulas[];
    idCurso: Curso;
    ordem: number;
}

export default ListarModulos;
