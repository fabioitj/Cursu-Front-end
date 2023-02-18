import "./style.scss";
import { MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultImage } from "../../assets/scripts/base";
import { useGlobalContext } from "../../context/ContaContext";
import { obterCursoById } from "../../hooks/cursosApi";
import { validarCursoByConta } from "../../hooks/cursoContaApi";
import Curso from "../../models/Curso/Curso.js";
import { comprarCurso } from "../../hooks/cursoContaApi";
import ComprarCurso from "../../models/CursoConta/ComprarCurso";
import { useNavigate } from "react-router-dom";
import LoggedUser from "../../models/Conta/LoggedUser";
import { useModalContext } from "../../context/ModalContext";
import { notify } from "../../assets/scripts/modal";
import Modulo from "../../components/Modulo";
import ListarModulos from "../../models/Curso/Modulo/ListarModulos";
import Separator from "../../components/Separator";
import { listarModulosPorCurso } from "../../hooks/modulosApi";

function CursoPage() {
    const { id } = useParams();

    const [curso, setCurso] = useState<Curso>();
    const { conta } = useGlobalContext();

    const navigate = useNavigate();

    const [cursoAdquirido, setCursoAdquirido] = useState(false);

    const { setTitle, setMessage, setType, setOpenedModal } = useModalContext();

    useEffect(() => {
        obterCursoById(id).then((response) => {
            if (response.data) {
                setCurso(response.data);
            }
        });

        listarModulosPorCurso(id as string)
            .then((response) => {
                if (response && response.data) {
                    setListaModulos(response.data);
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
    }, []);

    useEffect(() => {
        validarCursoByConta(conta?.conta._id, curso?._id).then((response) => {
            if (response.data && response.data.message) {
                alert(response.data.message);
            } else {
                setCursoAdquirido(response.data.obj);
            }
        });
    }, [curso]);

    const handleComprarCurso = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (!conta) {
            notify(
                "Atenção",
                "Você precisa estar logado para comprar um curso.",
                setTitle,
                setMessage,
                setType,
                setOpenedModal
            );
        }

        const comprarCursoModel: ComprarCurso = {
            conta: conta?.conta._id as string,
            curso: curso?._id as string,
        };

        comprarCurso(comprarCursoModel).then((response) => {
            if (response.data && response.data.message) {
                notify(
                    "Atenção",
                    response.data.message,
                    setTitle,
                    setMessage,
                    setType,
                    setOpenedModal
                );
            } else {
                notify(
                    "Sucesso",
                    "Curso comprado com sucesso!",
                    setTitle,
                    setMessage,
                    setType,
                    setOpenedModal
                );
                navigate("/");
            }
        });
    };

    const handleAssistirCurso = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        navigate("/cursos/assistir/" + curso?._id);
    };

    const [listaModulos, setListaModulos] = useState<ListarModulos[]>();

    const imagem = `${
        !curso?.imagem?.startsWith("data:image/png;base64,")
            ? "data:image/png;base64,"
            : ""
    }${curso?.imagem ? curso?.imagem : defaultImage()}`;
    const banner = `${
        !curso?.banner?.startsWith("data:image/png;base64,")
            ? "data:image/png;base64,"
            : ""
    }${curso?.banner ? curso?.banner : defaultImage()}`;
    return (
        <div className="curso">
            <div className="curso-box">
                <div className="curso-box-item">
                    <img src={imagem} className="curso-box-item-image" />
                </div>
                <div className="curso-box-item curso-box-details">
                    <h3 className="curso-box-item-title">{curso?.nome}</h3>
                    {!cursoAdquirido && (
                        <span className="curso-box-item-price">
                            <span className="curso-box-item-price-bruto">
                                R${curso?.preco_bruto}
                            </span>{" "}
                            - R${curso?.preco_liquido}
                        </span>
                    )}

                    <p className="curso-box-item-description">
                        {curso?.descricao}
                    </p>
                    {!cursoAdquirido ? (
                            <button
                                className="curso-box-item-btn"
                                onClick={handleComprarCurso}
                            >
                                Comprar curso
                            </button>
                        ) : (
                            <button
                                className="curso-box-item-btn"
                                onClick={handleAssistirCurso}
                            >
                                Assistir curso
                            </button>
                        )
                    }
                </div>
            </div>

            <div className="curso-aulas">
                <div className="curso-aulas-header">
                    <h3 className="curso-aulas-header-title">Aulas</h3>
                </div>
                <div className="curso-aulas-body">
                    <ul className="curso-aulas-body-modulos">
                        {listaModulos &&
                            listaModulos.map((modulo: ListarModulos) => {
                                return (
                                    <>
                                        <li className="curso-aulas-body-modulos-item">
                                            <Modulo
                                                modulo={modulo}
                                                modulos={listaModulos}
                                                curso={curso?._id as string}
                                                setModulos={setListaModulos}
                                                view={true}
                                            />
                                        </li>
                                        <Separator />
                                    </>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CursoPage;
