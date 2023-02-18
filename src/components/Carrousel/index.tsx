import { defaultImage } from "../../assets/scripts/base";
import NavLink from "../NavLink";
import Curso from "../../models/Curso/Curso";
import "./style.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/ContaContext";

function Carrousel({ list, description = "", tag = "", id = "0" }) {
    const { conta } = useGlobalContext();

    useEffect(() => {});

    return (
        <div className="carrousel">
            <div className="carrousel-box">
                <div className="carrousel-box-header">
                    {tag == "h2" && (
                        <h2 className="carrousel-box-header-principal-title">
                            {description}
                        </h2>
                    )}
                    {tag == "h3" && (
                        <h3 className="carrousel-box-header-secondary-title">
                            {description}
                        </h3>
                    )}
                </div>
                <div className="carrousel-box-body">
                    <ul className="carrousel-box-body-list">
                        {list?.length == 0 && (
                            <p>Sua lista de cursos está vazia.</p>
                        )}
                        {list?.map((curso: Curso) => {
                            const imagem = `${
                                !curso.banner?.startsWith(
                                    "data:image/png;base64,"
                                )
                                    ? "data:image/png;base64,"
                                    : ""
                            }${curso.banner ? curso.banner : defaultImage()}`;
                            const url = `/cursos/${curso._id}`;
                            const three_dots = require("../../assets/images/three_dots_white.png");
                            return (
                                <li className="carrousel-box-body-list-item">
                                    {conta?.conta?._id ===
                                        curso.idProfessor._id && (
                                        <div className="carrousel-box-body-list-item-action">
                                            <input
                                                type="checkbox"
                                                id={
                                                    "carrousel-box-body-list-item-action-btn-" +
                                                    curso._id +
                                                    id
                                                }
                                                className="carrousel-box-body-list-item-action-btn"
                                            />
                                            <label
                                                htmlFor={
                                                    "carrousel-box-body-list-item-action-btn-" +
                                                    curso._id +
                                                    id
                                                }
                                            >
                                                <img
                                                    src={three_dots}
                                                    className="carrousel-box-body-list-item-action-image"
                                                    alt="Options"
                                                />
                                            </label>
                                            <ul className="carrousel-box-body-list-item-action-list">
                                                <li className="carrousel-box-body-list-item-action-list-item">
                                                    <NavLink
                                                        url={
                                                            "/cursos/editar/" +
                                                            curso._id
                                                        }
                                                        class_tag={
                                                            "carrousel-box-body-list-item-action-list-item-link"
                                                        }
                                                    >
                                                        Editar
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                    <NavLink
                                        url={url}
                                        class_tag="carrousel-box-body-list-item-link"
                                    >
                                        <img
                                            className="carrousel-box-body-list-item-link-image"
                                            src={imagem}
                                            loading="lazy"
                                        />

                                        <div className="carrousel-box-body-list-item-link-description">
                                            <span className="carrousel-box-body-list-item-link-description-title">
                                                {curso.nome}
                                            </span>

                                            {/* <span className="carrousel-box-list-item-link-description-price"><span className="carrousel-box-list-item-link-description-price-bruto">R${curso.preco_bruto}</span> - R${curso.preco_liquido}</span> */}
                                        </div>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Carrousel;
