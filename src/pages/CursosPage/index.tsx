import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { isNull } from "../../assets/scripts/base";
import { notify } from "../../assets/scripts/modal";
import Field from "../../components/Field";
import SelectBox from "../../components/SelectBox";
import { useModalContext } from "../../context/ModalContext";
import { listarCategorias } from "../../hooks/categoriasApi";
import { listarCursosComFiltro } from "../../hooks/cursosApi";
import ListarCategorias from "../../models/Categoria/ListarCategorias";
import Curso from "../../models/Curso/Curso";
import CursoCard from "./CursoCard";
import "./style.scss";

function CursosPage() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [cursosFiltro, setCursosFiltro] = useState<Curso[]>([]);

    const filter = require("../../assets/images/filter.png");

    useEffect(() => {
        handleListar();
    }, []);

    const handleListar = (categoria = categoriaFiltro, nome = nomeFiltro) => {
        listarCursosComFiltro(categoria, nome).then((response) => {
            if (response.data) {
                setCursos(response.data);
                setCursosFiltro(response.data);
            }
        });
    };

    const [categorias, setCategorias] = useState<ListarCategorias[]>();
    const [categoriaFiltro, setCategoriaFiltro] = useState("");
    const [nomeFiltro, setNomeFiltro] = useState("");

    return (
        <div className="cursos">
            <div className="cursos-box">
                <div className="cursos-box-header">
                    <h2>Cursos</h2>
                    <label
                        htmlFor="cursos-box-input"
                        className="cursos-box-header-label"
                    >
                        <img
                            className="cursos-box-header-filter"
                            src={filter}
                        />
                    </label>
                </div>
                <input
                    id="cursos-box-input"
                    type={"checkbox"}
                    className="cursos-box-input"
                    hidden
                />
                <div className="cursos-box-filter">
                    <Filter
                        categorias={categorias as ListarCategorias[]}
                        setCategorias={setCategorias}
                        categoriaFiltro={categoriaFiltro}
                        setCategoriaFiltro={setCategoriaFiltro}
                        nomeFiltro={nomeFiltro}
                        setNomeFiltro={setNomeFiltro}
                        cursos={cursos}
                        setCursosFiltro={setCursosFiltro}
                    />
                </div>
                <div className="cursos-box-body">
                    {cursosFiltro.map((curso: Curso) => {
                        return <CursoCard curso={curso}></CursoCard>;
                    })}
                </div>
            </div>
        </div>
    );
}

interface FilterProps {
    categorias: ListarCategorias[];
    setCategorias: React.Dispatch<ListarCategorias[]>;
    categoriaFiltro: string;
    setCategoriaFiltro: React.Dispatch<string>;
    nomeFiltro: string;
    setNomeFiltro: React.Dispatch<string>;
    cursos: Curso[];
    setCursosFiltro: React.Dispatch<Curso[]>;
}

function Filter(FilterProps: FilterProps) {
    const {
        categorias,
        setCategorias,
        categoriaFiltro,
        setCategoriaFiltro,
        nomeFiltro,
        setNomeFiltro,
        cursos,
        setCursosFiltro,
    } = FilterProps;

    const { setTitle, setMessage, setType, setOpenedModal } = useModalContext();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        listarCategorias()
            .then((response) => {
                if (response && response.data) {
                    setCategorias(response.data);
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

        const categoria = searchParams.get("categoria");
        if (!isNull(categoria)) {
            setCategoriaFiltro(categoria as string);
        }
    }, []);

    useEffect(() => {

        if(categoriaFiltro || nomeFiltro)
            handleListar();
        else
            handleLimpar();
    }, [categoriaFiltro, nomeFiltro]);

    const handleListar = () => {
        const filter = (cursoFilter: Curso) => {
            let toFilter = false;

            if (categoriaFiltro && nomeFiltro) {
                toFilter =
                    cursoFilter.idCategoria._id === categoriaFiltro &&
                    cursoFilter.nome
                        .toUpperCase()
                        .includes(nomeFiltro.toUpperCase());
            } else {
                if (categoriaFiltro)
                    toFilter = cursoFilter.idCategoria._id === categoriaFiltro;

                if (nomeFiltro)
                    toFilter = cursoFilter.nome
                        .toUpperCase()
                        .includes(nomeFiltro.toUpperCase());
            }

            return toFilter;
        };

        if (categoriaFiltro || nomeFiltro) {
            const newlist = cursos.filter((curso) => filter(curso));
            setCursosFiltro(newlist);
        }
    };

    const handleLimpar = () => {
        cleanFilter();

        setCursosFiltro(cursos);
    };

    const cleanFilter = () => {
        setCategoriaFiltro("");
        setNomeFiltro("");
    };

    return (
        <div className="filter-box">
            <div className="filter-box-header">
                <h3 className="filter-box-header-title">Filtros</h3>
            </div>
            <div className="filter-box-body">
                <Field
                    value={nomeFiltro}
                    setValue={setNomeFiltro}
                    placeholder={"Nome do curso"}
                />
                <SelectBox
                    list={categorias}
                    value={categoriaFiltro}
                    setValue={setCategoriaFiltro}
                    defaultOption="Selecione uma categoria"
                />
            </div>
            <div className="filter-box-footer">
                {/* <button className="filter-box-footer-search" onClick={handleListar}>Filtrar</button> */}
                <button
                    className="filter-box-footer-search"
                    onClick={handleLimpar}
                >
                    Limpar
                </button>
            </div>
        </div>
    );
}

export default CursosPage;
