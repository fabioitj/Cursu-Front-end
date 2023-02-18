import "./style.scss";
import ListarModulos from "../../models/Curso/Modulo/ListarModulos";
import ListarAulas from "../../models/Curso/Aula/ListarAulas";
import Aula from "../Aula";
import CreateAula from "../Aula/CreateAula";
import { useState } from "react";
import Field from "../Field";
import { alterarModulo, removerModulo } from "../../hooks/modulosApi";
import { confirm, notify } from "../../assets/scripts/modal";
import { useModalContext } from "../../context/ModalContext";
import UpdateModulo from "../../models/Curso/Modulo/UpdateModulo";
import Curso from "../../models/Curso/Curso";

function Modulo({
    modulo,
    modulos,
    curso,
    setModulos,
    view,
    setAulaEscolhida,
}: {
    modulo: ListarModulos;
    modulos: ListarModulos[];
    curso: string;
    setModulos: React.Dispatch<ListarModulos[]>;
    view: boolean;
    setAulaEscolhida?: React.Dispatch<ListarAulas>;
}) {
    const { setTitle, setMessage, setType, setOpenedModal, setCallback } =
        useModalContext();

    const edit = require("../../assets/images/white-edit.png");
    const remove = require("../../assets/images/white-remove.png");

    const confirmIcon = require("../../assets/images/white-confirm.png");
    const cancel = require("../../assets/images/white-cancel.png");

    const arrow = require("../../assets/images/white-down-arrow.png");

    const [isEditing, setIsEditing] = useState(false);

    const [descricaoModulo, setDescricaoModulo] = useState("");

    const handleConfirmRemove = () => {
        confirm(
            "Atenção",
            "Ao remover este módulo, todas as aulas serão perdidas, deseja continuar?",
            () => handleRemove(),
            setTitle,
            setMessage,
            setType,
            setOpenedModal,
            setCallback
        );
    };

    const handleRemove = () => {
        removerModulo(modulo._id as string)
            .then((response) => {
                if (response && response.data) {
                    const index = modulos.map((x) => x._id).indexOf(modulo._id);

                    const newModulos = modulos.filter((item, i) => i !== index);
                    setModulos(newModulos);
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

    const handleIsEditing = () => {
        setIsEditing(true);
        setDescricaoModulo(modulo.descricao);
    };

    const handleCancelEditing = () => {
        setIsEditing(false);
    };

    const handleConfirm = () => {
        // if(!validate())
        //     return;

        if (descricaoModulo !== modulo.descricao) {
            const newModulo: UpdateModulo = {
                _id: modulo._id,
                descricao: descricaoModulo,
                idCurso: modulo.idCurso._id,
                ordem: modulos.length + 1,
            };

            alterarModulo(newModulo)
                .then((response) => {
                    if (response && response.data) {
                        const index = modulos
                            .map((x) => x._id)
                            .indexOf(newModulo._id);
                        const newModulos = modulos;
                        newModulos[index].descricao = newModulo.descricao;
                        setModulos(newModulos);
                        setIsEditing(false);
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
        } else {
            setIsEditing(false);
        }
    };

    const validate = () => {
        const validations: string[] = [];
        if (descricaoModulo === modulo.descricao)
            validations.push("Você não realizou nenhuma alteração");

        if (validations.length > 0) {
            notify(
                "Atenção",
                validations.join("&space"),
                setTitle,
                setMessage,
                setType,
                setOpenedModal
            );
            return false;
        }

        return true;
    };

    const [aulas, setAulas] = useState<ListarAulas[]>(modulo?.aulas);

    return (
        <div className="modulo">
            <input
                type="checkbox"
                id={"modulo-input-" + modulo._id}
                className="modulo-input"
                hidden
            />
            <div className="modulo-header">
                {!isEditing ? (
                    <>
                        <p
                            className="modulo-header-title"
                            onClick={() => {
                                !view && handleIsEditing();
                            }}
                        >
                            {modulo.descricao}
                        </p>
                        <div className="modulo-header-actions">
                            {!view && (
                                <>
                                    <img
                                        className="modulo-header-actions-edit"
                                        src={edit}
                                        onClick={handleIsEditing}
                                        alt={"Edit"}
                                    />
                                    <img
                                        className="modulo-header-actions-remove"
                                        src={remove}
                                        onClick={handleConfirmRemove}
                                        alt={"Remove"}
                                    />
                                </>
                            )}
                            <label
                                htmlFor={"modulo-input-" + modulo._id}
                                className="modulo-header-actions-label"
                            >
                                <img
                                    className="modulo-header-actions-arrow"
                                    src={arrow}
                                    alt="Expandir/Suprimir o módulo"
                                />
                            </label>
                        </div>
                    </>
                ) : (
                    <>
                        <Field
                            value={descricaoModulo}
                            setValue={setDescricaoModulo}
                            tamanho="12"
                            placeholder="Nova aula"
                        />
                        <div className="modulo-header-actions">
                            <img
                                className="modulo-header-actions-confirm"
                                src={confirmIcon}
                                alt="Confirma inserção de aula"
                                onClick={handleConfirm}
                            />
                            
                            <img
                                className="modulo-header-actions-cancel"
                                src={cancel}
                                alt="Cancela inserção de aula"
                                onClick={handleCancelEditing}
                            />

                            <label
                                htmlFor={"modulo-input-" + modulo._id}
                                className="modulo-header-actions-label"
                            >
                                <img
                                    className="modulo-header-actions-arrow"
                                    src={arrow}
                                    alt="Expandir/Suprimir o módulo"
                                />
                            </label>
                        </div>
                    </>
                )}
            </div>
            <div className="modulo-body">
                <ul
                    className={
                        "modulo-body-aulas" +
                        (!view ? " modulo-body-aulas-editable" : "")
                    }
                >
                    {aulas &&
                        aulas.map((aula: ListarAulas) => {
                            return (
                                <li className="modulo-body-aulas-item">
                                    <Aula
                                        aula={aula}
                                        aulas={aulas}
                                        setAulas={setAulas}
                                        view={view}
                                        setAulaEscolhida={setAulaEscolhida}
                                    />
                                </li>
                            );
                        })}
                    {!view && (
                        <li className="modulo-body-aulas-item">
                            <CreateAula
                                modulo={modulo?._id}
                                curso={curso}
                                aulas={aulas}
                                setAulas={setAulas}
                            />
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Modulo;
