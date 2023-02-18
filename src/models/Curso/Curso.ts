import ListarCategorias from "../Categoria/ListarCategorias";
import Account from "../Conta/AccountGet";

interface Curso {
    _id: string;
    nome: string;
    descricao: string;
    imagem: string; // base64
    banner: string;
    preco_bruto: string;
    desconto: string;
    preco_liquido: string;
    idProfessor: Account;
    idCategoria: ListarCategorias;
    idCollection: string;
}

export default Curso;
