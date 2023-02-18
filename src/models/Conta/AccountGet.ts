import TipoConta from "../TipoConta";

interface Account {
    _id: string;
    nome: string;
    email: string;
    senha: string;
    tipo: TipoConta;
}

export default Account;
