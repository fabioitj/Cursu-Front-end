import { toBase64 } from "../../../assets/scripts/base";
import { confirm, notify } from "../../../assets/scripts/modal";
import Field from "../../../components/Field";
import CreateCurso from "../../../models/Curso/CreateCurso";
import { useState, useEffect, MouseEvent } from "react";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../../context/ContaContext";
import { useModalContext } from "../../../context/ModalContext";
import { alterarCurso, obterCursoById } from "../../../hooks/cursosApi";
import Curso from "../../../models/Curso/Curso";
import UpdateCurso from "../../../models/Curso/UpdateCurso";
import ListarModulos from "../../../models/Curso/Modulo/ListarModulos";
import Modulo from "../../../components/Modulo";
import { listarModulosPorCurso } from "../../../hooks/modulosApi";
import CreateModulo from "../../../components/Modulo/CreateModulo";
import Separator from "../../../components/Separator";
import { currencyMask } from "../../../assets/scripts/masks/currencyMask";

function EditarCurso() {
    const [nomeCurso, setNomeCurso] = useState("");
    const [descricaoCurso, setDescricaoCurso] = useState("");
    // const [gratuitoCurso, setGratuitoCurso] = useState(false);
    const [valorCurso, setValorCurso] = useState("");
    const [descontoCurso, setDescontoCurso] = useState("");

    const [imagemCurso, setImagemCurso] = useState<File>();
    const [bannerCurso, setBannerCurso] = useState<File>();

    const [imagemBase64Curso, setImagemBase64Curso] = useState("");
    const [bannerBase64Curso, setBannerBase64Curso] = useState("");

    const { conta } = useGlobalContext();
    const { setTitle, setMessage, setType, setOpenedModal, setCallback } = useModalContext();
    const navigate = useNavigate();
    const { id } = useParams();

    const [curso, setCurso] = useState<Curso>();

    const handleSalvar = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const preco_bruto = parseFloat(
            valorCurso?.replaceAll(".", "").replace(",", ".").replace("R$ ", "")
        );
        const desconto = parseFloat(
            descontoCurso?.replace(".", "").replace(",", ".").replace("% ", "")
        );
        let preco_liquido = 0;
        if (desconto && desconto > 0) {
            preco_liquido = preco_bruto - (preco_bruto * desconto) / 100;
        }

        const curso: UpdateCurso = {
            _id: id as string,
            nome: nomeCurso,
            descricao: descricaoCurso,
            imagem: imagemBase64Curso,
            banner: bannerBase64Curso,
            preco_bruto: preco_bruto.toString(),
            desconto: desconto.toString(),
            preco_liquido: preco_liquido.toFixed(2).toString(),
            idProfessor: conta?.conta._id as string,
        };

        confirm("Atenção", "Você deseja realmente alterar este curso?", () => handleAlterar(curso), setTitle, setMessage, setType, setOpenedModal, setCallback);
    };

    const handleAlterar = (curso: UpdateCurso) => {
        alterarCurso(curso)
            .then((response) => {
                if (response && response.data) {
                    notify(
                        "Sucesso",
                        "Seu curso está em análise",
                        setTitle,
                        setMessage,
                        setType,
                        setOpenedModal
                    );
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

    useEffect(() => {
        obterCursoById(id).then((response) => {
            if (response && response.data) {
                const cursoResopnse: Curso = response.data as Curso;
                setNomeCurso(cursoResopnse.nome);
                setDescricaoCurso(cursoResopnse.descricao);
                setValorCurso(currencyMask(cursoResopnse.preco_bruto, "R$ "));
                setDescontoCurso(currencyMask(cursoResopnse.desconto, "% "));
                setImagemBase64Curso(cursoResopnse.imagem);
                setBannerBase64Curso(cursoResopnse.banner);
                setCurso(cursoResopnse);
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
        toBase64(imagemCurso).then((result) =>
            setImagemBase64Curso(result as string)
        );
    }, [imagemCurso]);

    useEffect(() => {
        toBase64(bannerCurso).then((result) =>
            setBannerBase64Curso(result as string)
        );
    }, [bannerCurso]);

    const handleAddModulo = () => {};

    const [listaModulos, setListaModulos] = useState<ListarModulos[]>();

    return (
        <div className="editar-curso">
            <div className="editar-curso-box">
                <div className="editar-curso-box-header">
                    <h3 className="editar-curso-box-header-title">
                        Editar curso
                    </h3>
                </div>
                <div className="editar-curso-box-body">
                    <form role="form">
                        <Field
                            placeholder="Nome do curso"
                            type="text"
                            value={nomeCurso}
                            setValue={setNomeCurso}
                        />
                        <Field
                            placeholder="Descrição"
                            type="text"
                            value={descricaoCurso}
                            setValue={setDescricaoCurso}
                            field="textarea"
                        />

                        <Field
                            placeholder="Valor"
                            type="text"
                            value={valorCurso}
                            setValue={setValorCurso}
                            tamanho="6"
                            field="money"
                            prefix="R$ "
                        />
                        <Field
                            placeholder="Desconto"
                            type="text"
                            value={descontoCurso}
                            setValue={setDescontoCurso}
                            tamanho="6"
                            field="money"
                            prefix="% "
                            max="99.99"
                            showMax={true}
                        />

                        <div className="editar-curso-box-body-images">
                            <Field
                                placeholder={"Escolha um imagem (900x900)"}
                                type="file"
                                value={imagemCurso}
                                setValue={setImagemCurso}
                                field="file"
                                image={imagemBase64Curso}
                                showImage={true}
                                code="1"
                            />
                            <Field
                                placeholder={"Escolha um banner (1600x900)"}
                                type="file"
                                value={bannerCurso}
                                setValue={setBannerCurso}
                                field="file"
                                image={bannerBase64Curso}
                                showImage={true}
                                code="2"
                            />
                        </div>
                        <div className="minha-conta-box-body-button">
                            <button
                                className="minha-conta-box-body-button-alterar"
                                onClick={handleSalvar}
                            >
                                Editar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="editar-curso-aulas" id="editar-curso-aulas">
                <div className="editar-curso-aulas-header">
                    <h3 className="editar-curso-aulas-header-title">Aulas</h3>
                </div>
                <div className="editar-curso-aulas-body">
                    <ul className="editar-curso-aulas-body-modulos">
                        {listaModulos &&
                            listaModulos.map((modulo: ListarModulos) => {
                                return (
                                    <>
                                        <li className="editar-curso-aulas-body-modulos-item">
                                            <Modulo
                                                modulo={modulo}
                                                modulos={listaModulos}
                                                curso={id as string}
                                                
                                                setModulos={setListaModulos}
                                                view={false}
                                            />
                                        </li>
                                        <Separator />
                                    </>
                                );
                            })}
                        <li className="editar-curso-aulas-body-modulos-item">
                            <CreateModulo
                                curso={id as string}
                                modulos={listaModulos as ListarModulos[]}
                                setModulos={setListaModulos}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default EditarCurso;
