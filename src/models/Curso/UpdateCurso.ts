interface UpdateCurso {
    _id: string;
    nome: string;
    descricao: string;
    imagem: string; // base64
    banner: string;
    preco_bruto: string;
    desconto: string;
    preco_liquido: string;
    idProfessor: string;
}

export default UpdateCurso;
