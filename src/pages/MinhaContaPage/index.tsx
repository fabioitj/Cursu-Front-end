import { useGlobalContext } from "../../context/ContaContext";
import { useEffect, useState, MouseEvent } from "react";
import "./styles.scss";
import Field from "../../components/Field";
import { alterarConta } from "../../hooks/contasApi";
import AccountPut from "../../models/Conta/AccountPut";
import { updateLocalStorage } from "../../assets/scripts/base";
import Account from "../../models/Conta/AccountGet";
import ModalNotify from "../../components/Modal/Notify";
import { useModalContext } from "../../context/ModalContext";
import Curso from "../../models/Curso/Curso";
import { listarMeusCursos } from "../../hooks/cursoContaApi";
import { notify } from "../../assets/scripts/modal";
import CursoCard from "../CursosPage/CursoCard";
import Carrousel from "../../components/Carrousel";
import { listarCursosPorProfessor } from "../../hooks/cursosApi";

function MinhaContaPage() {
    const { conta } = useGlobalContext();
    const [nome, setNome] = useState(conta?.conta.nome);
    const [email, setEmail] = useState(conta?.conta.email);

    const { setTitle, setMessage, setType, setOpenedModal } = useModalContext();

    const [cursos, setCursos] = useState<Curso[]>();
    const [cursosCriadosPorMim, setCursosCriadosPorMim] = useState<Curso[]>();

    useEffect(() => {
        listarMeusCursos(conta?.conta._id as string).then((response) => {
            if (response && response.data && response.data.message) {
                notify(
                    "Atenção",
                    response.data.message,
                    setTitle,
                    setMessage,
                    setType,
                    setOpenedModal
                );
            } else if (response && response.data) {
                setCursos(response.data.map((item) => item.curso));
            }
        });

        if (conta?.conta.tipo.descricao == "Professor") {
            listarCursosPorProfessor(conta?.conta?._id)
                .then((response) => {
                    if (response && response.data) {
                        setCursosCriadosPorMim(response.data);
                    }
                })
                .catch((err) => {
                    notify(
                        "Atenção",
                        err.message,
                        setTitle,
                        setMessage,
                        setType,
                        setOpenedModal
                    );
                });
        }
    }, []);

    const handleSalvar = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const alteracao: AccountPut = {
            nome: nome as string,
        };

        alterarConta(conta?.conta._id as string, alteracao).then((response) => {
            if (response.data) {
                updateLocalStorage(response.data as Account);
                setTitle("Sucesso");
                setMessage("Conta alterada com sucesso!");
                setOpenedModal(true);
            }
        });
    };

    const handleTrocarSenha = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
    };

    return (
        <div className="minha-conta">
            <div className="minha-conta-box">
                <div className="minha-conta-box-header">
                    <h3 className="minha-conta-box-header-title">Meus dados</h3>
                </div>
                <div className="minha-conta-box-body">
                    <form role="form">
                        <Field
                            title=""
                            placeholder="Digite o seu nome"
                            type="text"
                            value={nome}
                            setValue={setNome}
                        />
                        <Field
                            title=""
                            placeholder="Digite o seu e-mail"
                            type="email"
                            value={email}
                            setValue={setEmail}
                            readonly={true}
                        />

                        <div className="minha-conta-box-body-button">
                            <button
                                className="minha-conta-box-body-button-alterar"
                                onClick={handleSalvar}
                            >
                                Salvar
                            </button>
                            <button
                                className="minha-conta-box-body-button-password"
                                onClick={handleTrocarSenha}
                            >
                                Trocar senha
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="minha-conta-meus-cursos">
                <div className="minha-conta-meus-cursos-header">
                    <h3 className="minha-conta-meus-cursos-header-title">
                        Meus cursos
                    </h3>
                </div>
                <div className="minha-conta-meus-cursos-body">
                    {cursos && <Carrousel list={cursos} id={"1"} />}
                </div>
            </div>

            {conta?.conta?.tipo?.descricao == "Professor" && (
                <div className="minha-conta-cursos-criados-por-mim">
                    <div className="minha-conta-cursos-criados-por-mim-header">
                        <h3 className="minha-conta-cursos-criados-por-mim-header-title">
                            Criados por mim
                        </h3>
                    </div>
                    <div className="minha-conta-cursos-criados-por-mim-body">
                        {cursos && (
                            <Carrousel list={cursosCriadosPorMim} id={"2"} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MinhaContaPage;
