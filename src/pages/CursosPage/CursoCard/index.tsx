import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultImage } from "../../../assets/scripts/base";
import { notify } from "../../../assets/scripts/modal";
import { useGlobalContext } from "../../../context/ContaContext";
import { validarCursoByConta } from "../../../hooks/cursoContaApi";
import Curso from "../../../models/Curso/Curso";
import "./style.scss";

function CursoCard({ curso }: { curso: Curso }) {
    const imagem = `${
        !curso.imagem?.startsWith("data:image/png;base64,")
            ? "data:image/png;base64,"
            : ""
    }${curso.imagem ? curso.imagem : defaultImage()}`;

    const navigate = useNavigate();

    const handleGoToCurso = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        navigate("/cursos/" + curso._id);
    };

    const { conta } = useGlobalContext();
    const [cursoAdquirido, setCursoAdquirido] = useState<boolean>(false);
    useEffect(() => {
        // if(conta) {
        //     validarCursoByConta(conta?.conta._id, curso._id)
        //     .then((response) => {
        //         if(response && response.data) {
        //             setCursoAdquirido(response.data.obj);
        //         }
        //     })
        // }
    }, []);

    return (
        <div className="curso-card" onClick={handleGoToCurso}>
            <div className="curso-card-box">
                <div className="curso-card-box-header">
                    <img className="curso-card-box-header-image" src={imagem} />
                </div>
                <div className="curso-card-box-body">
                    <p className="curso-card-box-body-title">{curso.nome}</p>
                    {cursoAdquirido ? (
                        <span className="curso-card-box-body-price">
                            &#10003;
                        </span>
                    ) : (
                        <span className="curso-card-box-body-price">
                            <span className="curso-card-box-body-price-bruto">
                                R${curso.preco_bruto}
                            </span>{" "}
                            - R${curso.preco_liquido}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CursoCard;
