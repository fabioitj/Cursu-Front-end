import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.scss";
import { listarModulosPorCurso } from "../../../hooks/modulosApi";
import ListarModulos from "../../../models/Curso/Modulo/ListarModulos";
import { useModalContext } from "../../../context/ModalContext";
import { error, notify } from "../../../assets/scripts/modal";
import ListarAulas from "../../../models/Curso/Aula/ListarAulas";
import Separator from "../../../components/Separator";
import Modulo from "../../../components/Modulo";

function AssistirCurso() {
    const params = useParams();
    const { id } = params;

    const [listaModulos, setListaModulos] = useState<ListarModulos[]>();
    const [aulaEscolhida, setAulaEscolhida] = useState<ListarAulas>();

    const { setTitle, setMessage, setType, setOpenedModal } = useModalContext();

    useEffect(() => {
        listarModulosPorCurso(id as string)
            .then((response) => {
                if (response && response.data) {
                    const modulos = response.data as ListarModulos[];
                    setListaModulos(modulos);
                    if (modulos.length > 0) {
                        if (modulos[0].aulas && modulos[0].aulas.length > 0) {
                            console.log("entrei");
                            console.log(modulos[0].aulas[0]);
                            setAulaEscolhida(modulos[0].aulas[0]);
                        }
                    }
                }
            })
            .catch((err) => {
                error(
                    err.message,
                    setTitle,
                    setMessage,
                    setType,
                    setOpenedModal
                );
            });
    }, []);

    useEffect(() => {
        console.log("Aula escolhida: ", aulaEscolhida);
    }, [aulaEscolhida]);

    return (
        <div className="assistir-curso">
            <div className="assistir-curso-aula-escolhida">
                <div className="assistir-curso-aula-escolhida-body">
                    <div>
                        <iframe
                            src={aulaEscolhida?.url}
                           
                        ></iframe>
                    </div>
                </div>
            </div>

            <div className="assistir-curso-aulas">
                <div className="assistir-curso-aulas-header">
                    <h3 className="assistir-curso-aulas-header-title">Aulas</h3>
                </div>
                <div className="assistir-curso-aulas-body">
                    <ul className="assistir-curso-aulas-body-modulos">
                        {listaModulos &&
                            listaModulos.map((modulo: ListarModulos) => {
                                return (
                                    <>
                                        <li className="assistir-curso-aulas-body-modulos-item">
                                            <Modulo
                                                modulo={modulo}
                                                modulos={listaModulos}
                                                curso={id as string}
                                                setModulos={setListaModulos}
                                                view={true}
                                                setAulaEscolhida={
                                                    setAulaEscolhida
                                                }
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

export default AssistirCurso;
