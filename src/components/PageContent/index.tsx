import "./style.scss";
import { Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";
import InicioPage from "../../pages/InicioPage";
import CursoPage from "../../pages/CursoPage";
import RegistrarPage from "../../pages/RegistrarPage";
import LoginPage from "../../pages/LoginPage";
import CursosPage from "../../pages/CursosPage";
import MinhaContaPage from "../../pages/MinhaContaPage";
import CriarCurso from "../../pages/CursoPage/Criar";
import EditarCurso from "../../pages/CursoPage/Editar";
import AssistirCurso from "../../pages/CursoPage/Assistir";
import PrivatePage from "../PrivatePage";

function PageContent() {
    return (
        <section className="page-content">
            <Routes>
                <Route path="/" element={<Navigate to="/inicio" replace/>}></Route>
                <Route path="/inicio" element={<InicioPage/>}></Route>

                <Route path="/cursos" element={<CursosPage/>}></Route>
                <Route path="/cursos/novo" element={<PrivatePage><CriarCurso/></PrivatePage>}></Route>
                <Route path="/cursos/editar/:id" element={<PrivatePage><EditarCurso/></PrivatePage>}></Route>
                <Route path="/cursos/assistir/:id" element={<PrivatePage><AssistirCurso/></PrivatePage>}></Route>
                <Route path="/cursos/:id" element={<CursoPage/>}></Route>

                <Route path="/registrar" element={<RegistrarPage/>}></Route>
                <Route path="/entrar" element={<LoginPage/>}></Route>

                <Route path="/minha_conta" element={<PrivatePage><MinhaContaPage/></PrivatePage>}></Route>
            </Routes>
        </section>
    );
}

export default PageContent;