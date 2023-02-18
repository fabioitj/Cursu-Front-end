import "./style.scss";
import { useState } from "react";
import Field from "../../Field";
import CreateModuloModel from "../../../models/Curso/Modulo/CreateModulo";
import { inserirModulo } from "../../../hooks/modulosApi";
import { notify } from "../../../assets/scripts/modal";
import { useModalContext } from "../../../context/ModalContext";
import ListarModulos from "../../../models/Curso/Modulo/ListarModulos";

function CreateModulo({
    curso,
    modulos,
    setModulos,
}: {
    curso: string;
    modulos: ListarModulos[];
    setModulos: React.Dispatch<ListarModulos[]>;
}) {
    const { setTitle, setMessage, setType, setOpenedModal } = useModalContext();

    const confirm = require("../../../assets/images/white-confirm.png");

    const [descricaoModulo, setDescricaoModulo] = useState("");

    const handleSalvar = () => {
        const newModulo: CreateModuloModel = {
            descricao: descricaoModulo,
            idCurso: curso,
            ordem: modulos.length + 1,
        };

        inserirModulo(newModulo)
            .then((response) => {
                if (response && response.data) {
                    modulos
                        ? setModulos(modulos?.concat(response.data))
                        : setModulos([response.data]);
                    cleanField();
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

    const cleanField = () => {
        setDescricaoModulo("");
    };

    return (
        <div className="create-modulo">
            <div className="create-modulo-header">
                <Field
                    value={descricaoModulo}
                    setValue={setDescricaoModulo}
                    tamanho="12"
                    placeholder="Novo módulo"
                />
                <div className="create-modulo-header-actions">
                    <img
                        className="create-modulo-header-actions-confirm"
                        src={confirm}
                        onClick={handleSalvar}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateModulo;
