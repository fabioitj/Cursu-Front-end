import { useEffect, useState } from "react";
import { confirm, error, notify } from "../../assets/scripts/modal";
import { useModalContext } from "../../context/ModalContext";
import { removerAula, updateAulaUrl } from "../../hooks/aulasApi";
import ListarAulas from "../../models/Curso/Aula/ListarAulas";
import UpdateAulaUrl from "../../models/Curso/Aula/UpdateAulaUrl";
import ChunckedVideoFile from "../ChunckedVideoFile";
import Field from "../Field";
import Modal from "../Modal";
import VideoUploader from "../VideoUploader";
import "./style.scss";

function Aula({
    aula,
    aulas,
    setAulas,
    view,
    setAulaEscolhida
}: {
    aula: ListarAulas;
    aulas: ListarAulas[];
    setAulas: React.Dispatch<ListarAulas[]>;
    view: boolean;
    assistirAula?: boolean;
    setAulaEscolhida?: React.Dispatch<ListarAulas>;
}) {
    const { setTitle, setMessage, setType, setOpenedModal, setCallback } =
        useModalContext();

    const edit = require("../../assets/images/white-edit.png");
    const remove = require("../../assets/images/white-remove.png");
    const clock = require("../../assets/images/white-clock.png");
    const ordem = require("../../assets/images/white-list.png");

    const handleIsEditing = () => {
        setIsEditing(true);
    }

    const [isEditing, setIsEditing] = useState(false);
    const [isOrdering, setIsOrdering] = useState(false);

    const [descricaoAula, setDescricaoAula] = useState(aula.descricao);
    const [file, setFile] = useState<File>();
    const [msg, setMsg] = useState("");
    const [aulaDetalhe, setAulaDetalhe] = useState<ListarAulas>(aula);

    useEffect(() => {
        if(!isOrdering)
            return; 
        const aulas = document.getElementById("editar-curso-aulas");

        aulas?.addEventListener("click", (event) => {
            let ordering = document.getElementById("aula-header-ordering" + aula._id);
            if(!ordering?.contains(event.target as Node))
                setIsOrdering(false);
        })
    }, [isOrdering]);

    const handleEscolherAula = () => {
        setAulaEscolhida && setAulaEscolhida(aula);
    }

    const handleEdit = () => {};

    const handleEditUrl = (data) => {
        
    };

    const handleConfirmRemove = () => {
        confirm(
            "Atenção",
            "Deseja realmente excluir essa aula?",
            () => handleRemove(),
            setTitle,
            setMessage,
            setType,
            setOpenedModal,
            setCallback
        );
    };

    const handleRemove = () => {
        removerAula(aula)
            .then((response) => {
                if (response && response.data) {
                    const index = aulas.map((x) => x._id).indexOf(aula._id);

                    const newAulas = aulas.filter((item, i) => i !== index);
                    setAulas(newAulas);
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
    };

    const confirmIcon = require("../../assets/images/white-confirm.png");
    const arrow = require("../../assets/images/white-down-arrow.png");

    const handleOrderingUp = () => {
        let indexOf = aulas.indexOf(aula);
        
        if(indexOf == 0 || aulas.length <= 1) return;

        const aula_anterior = aulas[indexOf-1];
        const aula_atual = aulas[indexOf];

        const newAulas = [...aulas];
        newAulas[indexOf-1] = aula_atual;
        newAulas[indexOf] = aula_anterior;

        console.log("Aulas:", aulas);
        console.log("NewAulas:", newAulas);

        setAulas(newAulas);
    }

    const handleOrderingDown = () => {
        let indexOf = aulas.indexOf(aula);

        if(indexOf == aulas.length - 1 || aulas.length <= 1) return;

        const aula_posterior = aulas[indexOf+1];
        const aula_atual = aulas[indexOf];
        

        const newAulas = [...aulas];
        newAulas[indexOf+1] = aula_atual;
        newAulas[indexOf] = aula_posterior;

        console.log("Aulas:", aulas);
        console.log("NewAulas:", newAulas);

        setAulas(newAulas);
    }

    return (
        <div className="aula">
            <div className="aula-header">
                {isEditing && (
                    <Modal
                        title={"Editar aula"}
                        buttonName={"Alterar"}
                        callback={handleEdit}
                        setIsOpenedModal={setIsEditing}
                    >
                        <div className="aula-header-fields">
                            <Field
                                value={descricaoAula}
                                setValue={setDescricaoAula}
                                placeholder={"Descrição da aula"}
                            />

                            {
                                msg &&
                                <p className="aula-header-fields-title">{msg}</p>
                            }
                            

                            <VideoUploader
                                value={file as File}
                                setValue={setFile}
                                aula={aulaDetalhe}
                                setAula={setAulaDetalhe}
                                callback={handleEditUrl}
                            />

                           
                        </div>
                    </Modal>
                )}
                <>
                    {/* {
                        isOrdering && (
                            <div className="aula-header-ordering" id={"aula-header-ordering" + aula._id}>
                                <img className="aula-header-ordering-up" alt="Up" src={arrow} onClick={handleOrderingUp}/>
                                <img className="aula-header-ordering-down" alt="Down" src={arrow} onClick={handleOrderingDown}/>
                            </div>
                        )    
                    }
                    {
                        !view && (
                            <div className="aula-header-list">
                                <img className="aula-header-list-image" alt="Ordem" src={ordem} onClick={() => {setIsOrdering(true)}}/>
                            </div>
                        )    
                    } */}
                    

                    <div className={"aula-header-title " + (!view ? "aula-header-editable" : "")}>
                        {
                            setAulaEscolhida ? (
                                <a className="aula-header-title-link" href="#" onClick={handleEscolherAula}>
                                    <span className="aula-header-title-description">{aula.descricao}</span>

                                    <div className="aula-header-title-duration">
                                        <img src={clock} className="aula-header-title-duration-image" alt="Duração"/>
                                        {
                                            aulaDetalhe.duration && aulaDetalhe.url ? (
                                                <p className="aula-header-title-duration-text">{aulaDetalhe.duration}</p>
                                            ) : (
                                                <p className="aula-header-title-duration-text">--:--</p>
                                            )
                                        }
                                    </div>
                                </a>
                            ) : (
                                <>
                                    <span className="aula-header-title-description">{aula.descricao}</span>
                                    {
                                         
                                            <div className="aula-header-title-duration">
                                                <img src={clock} className="aula-header-title-duration-image" alt="Duração"/>
                                                {
                                                    aulaDetalhe.duration && aulaDetalhe.url ? (
                                                        <p className="aula-header-title-duration-text">{aulaDetalhe.duration}</p>
                                                    ) : (
                                                        <p className="aula-header-title-duration-text">--:--</p>
                                                    )
                                                }
                                            </div>
                                        
                                    }
                                </>
                            )
                        }
                    </div>
                    
                    {!view && (
                        <div className="aula-header-actions">
                            <img
                                className="aula-header-actions-edit"
                                src={edit}
                                onClick={handleIsEditing}
                                alt="Edit"
                            />
                            <img
                                className="aula-header-actions-remove"
                                src={remove}
                                onClick={handleConfirmRemove}
                                alt="Remove"
                            />
                        </div>
                    )}
                </>
            </div>
        </div>
    );
}

export default Aula;
