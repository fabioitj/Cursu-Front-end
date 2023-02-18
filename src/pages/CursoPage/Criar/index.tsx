import Field from "../../../components/Field";
import { useState, useEffect, MouseEvent } from "react";
import "./style.scss";
import Option from "../../../models/Option";
import { toBase64 } from "../../../assets/scripts/base";
import CreateCurso from "../../../models/Curso/CreateCurso";
import { useGlobalContext } from "../../../context/ContaContext";
import { criarCurso } from "../../../hooks/cursosApi";
import { confirm, notify } from "../../../assets/scripts/modal";
import { useModalContext } from "../../../context/ModalContext";
import Curso from "../../../models/Curso/Curso";
import { useNavigate } from "react-router-dom";
import SelectBox from "../../../components/SelectBox";
import ListarCategorias from "../../../models/Categoria/ListarCategorias";
import { listarCategorias } from "../../../hooks/categoriasApi";

function CriarCurso() {
    const [passoCriacao, setPassoCriacao] = useState(0);

    const [categoriaCurso, setCategoriaCurso] = useState("");

    const [nomeCurso, setNomeCurso] = useState("");
    const [descricaoCurso, setDescricaoCurso] = useState("");
    // const [gratuitoCurso, setGratuitoCurso] = useState(false);
    const [valorCurso, setValorCurso] = useState("");
    const [descontoCurso, setDescontoCurso] = useState("");

    const [imagemCurso, setImagemCurso] = useState();
    const [bannerCurso, setBannerCurso] = useState();

    const [imagemBase64Curso, setImagemBase64Curso] = useState("");
    const [bannerBase64Curso, setBannerBase64Curso] = useState("");

    const { conta } = useGlobalContext();
    const { setTitle, setMessage, setType, setOpenedModal, setCallback } = useModalContext();
    const navigate = useNavigate();

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

        const curso: CreateCurso = {
            nome: nomeCurso,
            descricao: descricaoCurso,
            imagem: imagemBase64Curso,
            banner: bannerBase64Curso,
            preco_bruto: preco_bruto.toString(),
            desconto: desconto.toString(),
            preco_liquido: preco_liquido.toFixed(2).toString(),
            idProfessor: conta?.conta._id as string,
            idCategoria: categoriaCurso,
        };

        confirm("Atenção", "Você deseja realmente criar esse curso?", () => handleCriar(curso), setTitle, setMessage, setType, setOpenedModal, setCallback)
    };

    const handleCriar = (curso: CreateCurso) => {
        criarCurso(curso)
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
                const id = (response.data as Curso)._id;
                navigate("/cursos/editar/" + id);
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

    const handleVoltar = () => {
        setPassoCriacao((passo) => passo - 1);
    };

    const handleNext = () => {
        setPassoCriacao((passo) => passo + 1);
    };

    const [listaCategorias, setListaCategorias] =
        useState<ListarCategorias[]>();

    useEffect(() => {
        listarCategorias()
            .then((response) => {
                if (response && response.data) {
                    setListaCategorias(response.data);
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
        imagemCurso && toBase64(imagemCurso[0]).then((result) =>
            setImagemBase64Curso(result as string)
        );
    }, [imagemCurso]);

    useEffect(() => {
        bannerCurso && toBase64(bannerCurso[0]).then((result) =>
            setBannerBase64Curso(result as string)
        );
    }, [bannerCurso]);

    const switchTitle = (passo: number) => {
        switch (passo) {
            case 0:
                return "Selecione a categoria";

            case 1:
                return "Informações gerais";
        }
    };

    return (
        <div className="criar-curso">
            <div className="criar-curso-box">
                <div className="criar-curso-box-header">
                    <h3 className="criar-curso-box-header-title">
                        {switchTitle(passoCriacao)}
                    </h3>
                </div>
                <div className="criar-curso-box-body">
                    {passoCriacao == 0 && (
                        <form
                            role="form"
                            className="criar-curso-box-body-categoria"
                        >
                            <SelectBox
                                list={listaCategorias}
                                value={categoriaCurso}
                                setValue={setCategoriaCurso}
                            />

                            <div className="criar-curso-box-body-button">
                                <span></span>
                                <button
                                    className="criar-curso-box-body-button-next"
                                    onClick={handleNext}
                                >
                                    Próximo
                                </button>
                            </div>
                        </form>
                    )}
                    {passoCriacao == 1 && (
                        <form
                            role="form"
                            className="criar-curso-box-body-infos"
                        >
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

                            <div className="criar-curso-box-body-images">
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

                            <div className="criar-curso-box-body-button">
                                <button
                                    className="criar-curso-box-body-button-criar"
                                    onClick={handleVoltar}
                                >
                                    Voltar
                                </button>
                                <button
                                    className="criar-curso-box-body-button-criar"
                                    onClick={handleSalvar}
                                >
                                    Criar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CriarCurso;
