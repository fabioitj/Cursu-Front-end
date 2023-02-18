import "./style.scss";
import { useEffect, useState, MouseEvent } from "react";
import Field from "../../Field";
import Modal from "../../Modal";
import { inserirAula, uploadVideoAula } from "../../../hooks/aulasApi";
import CreateAulaModel from "../../../models/Curso/Aula/CreateAula";
import { notify } from "../../../assets/scripts/modal";
import { useModalContext } from "../../../context/ModalContext";
import ListarAulas from "../../../models/Curso/Aula/ListarAulas";
import FormData from "form-data";
import UploadVideoAula from "../../../models/Curso/Aula/UploadVideoAula";
import ChunckedVideoFile from "../../ChunckedVideoFile";

function CreateAula({
    modulo,
    curso,
    aulas,
    setAulas,
}: {
    modulo: string;
    curso: string;
    aulas: ListarAulas[];
    setAulas: React.Dispatch<ListarAulas[]>;
}) {
    const confirm = require("../../../assets/images/white-confirm.png");
    const add = require("../../../assets/images/white-add.png");
    const cancel = require("../../../assets/images/white-cancel.png");

    const [descricaoAula, setDescricaoAula] = useState("");
    
    const [isCreating, setIsCreating] = useState(false);

    const { setTitle, setMessage, setType, setOpenedModal } = useModalContext();

    const handleIsCreating = () => {
        setIsCreating(true);
    };

    const handleCancelCreating = () => {
        setIsCreating(false);
    };

    const handleCreate = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault(); 

        const newAula: CreateAulaModel = {
            descricao: descricaoAula,
            idModulo: modulo,
            idCurso: curso,
            ordem: aulas.length + 1
        };

        inserirAula(newAula)
            .then((response) => {
                if (response && response.data) {
                    aulas
                        ? setAulas(aulas?.concat(response.data))
                        : setAulas([response.data]);
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

        setIsCreating(false);
        cleanFields();
    };

    const cleanFields = () => {
        setDescricaoAula("");
    };

    return (
        <div className="create-aula">
            <div className="create-aula-header">
                {isCreating && (
                    <Modal
                        title={"Nova aula"}
                        buttonName={"Criar"}
                        callback={handleCreate}
                        setIsOpenedModal={setIsCreating}
                    >
                        <div className="create-aula-header-fields">
                            <Field
                                value={descricaoAula}
                                setValue={setDescricaoAula}
                                placeholder={"Descrição da aula"}
                            />
                        </div>
                    </Modal>
                )}
                <>
                    <span></span>
                    <div className="create-aula-header-actions">
                        <img
                            className="create-aula-header-actions-add"
                            src={add}
                            alt="Nova aula"
                            onClick={handleIsCreating}
                        />
                    </div>
                </>
            </div>
        </div>
    );
}

export default CreateAula;
