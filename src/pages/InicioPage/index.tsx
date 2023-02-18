import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/ContaContext";
import { listarCursosAdicionadosRecentemente } from "../../hooks/cursosApi";
import Curso from "../../models/Curso/Curso";
import Carrousel from "../../components/Carrousel";
import "./style.scss";

function InicioPage() {
    const { conta, setConta } = useGlobalContext();

    const [adicionadosRecentemente, setAdicionadosRecentemente] = useState<
        Curso[]
    >([]);
    const [populares, setPopulares] = useState<Curso[]>([]);
    const [melhorAvaliados, setMelhorAvaliados] = useState<Curso[]>([]);

    useEffect(() => {
        listarCursosAdicionadosRecentemente().then((response) => {
            if (response.data) {
                setAdicionadosRecentemente(response.data);
                setPopulares(response.data);
                setMelhorAvaliados(response.data);
            }
        });
    }, []);

    return (
        <div className="inicio">
            {conta && (
                <div className="inicio-item">
                    <h2 className="inicio-item-title">
                        Bem vindo, {conta?.conta.nome.split(" ")[0]}
                    </h2>
                </div>
            )}

            <div className="inicio-item">
                <h3 className="inicio-item-subtitle">
                    Adicionados recentemente
                </h3>
                <Carrousel list={adicionadosRecentemente} tag="h2" id="1" />
            </div>
            <div className="inicio-item">
                <h3 className="inicio-item-subtitle">Mais populares</h3>
                <Carrousel list={populares} tag="h2" id="2" />
            </div>
            <div className="inicio-item">
                <h3 className="inicio-item-subtitle">Melhores avaliados</h3>
                <Carrousel list={melhorAvaliados} tag="h2" id="3" />
            </div>
        </div>
    );
}

export default InicioPage;
