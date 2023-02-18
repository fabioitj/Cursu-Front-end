import "./style.scss";
import React, { useEffect, useState } from "react";
import NavLink from "../NavLink";
import { useGlobalContext } from "../../context/ContaContext";
import { logout } from "../../hooks/contasApi";
import Separator from "../Separator";
import { listarCategorias } from "../../hooks/categoriasApi";
import { notify } from "../../assets/scripts/modal";
import { useModalContext } from "../../context/ModalContext";
import ListarCategorias from "../../models/Categoria/ListarCategorias";

function SideBar() {
    const hamburger = require("../../assets/images/white-hamburger.png");

    const { conta, setConta } = useGlobalContext();

    return (
        <>
            <input
                className="sidebar-checkbox"
                id="sidebar-input-checkbox"
                type="checkbox"
                hidden
            />
            <label
                htmlFor="sidebar-input-checkbox"
                className="sidebar-hamburger-label"
            >
                <img
                    className="sidebar-hamburger-image"
                    src={hamburger}
                    width={30}
                    height={30}
                />
            </label>
            <div className="sidebar" hidden>
                <div className="sidebar-box">
                    <CloseSideBarButton />

                    <div className="sidebar-item sidebar-auth">
                        {conta ? <LogoutButton /> : <LoginButton />}
                    </div>

                    <div className="sidebar-item">
                        <NavigationList />
                    </div>
                </div>
            </div>
        </>
    );
}

function CloseSideBarButton() {
    const leftArrow = require("../../assets/images/white-left-arrow.png");

    return (
        <div className="sidebar-item-close">
            <label
                htmlFor="sidebar-input-checkbox"
                className="sidebar-item-close-label"
            >
                <img
                    className="sidebar-item-close-image"
                    src={leftArrow}
                    width={30}
                    height={30}
                />
            </label>
        </div>
    );
}

function LogoutButton() {
    const context = useGlobalContext();
    useEffect(() => {
        addEventCloseSidebar(document.getElementById("sidebar-item-account"));
        addEventCloseSidebar(document.getElementById("sidebar-item-create"));
        addEventCloseSidebar(document.getElementById("sidebar-item-logout"));
    }, []);

    const { conta } = useGlobalContext();

    return (
        <>
            <NavLink url="/minha_conta" class_tag="sidebar-item-account">
                <span>Minha conta</span>
            </NavLink>
            {conta?.conta.tipo.descricao == "Professor" && (
                <>
                    <Separator />
                    <NavLink url="/cursos/novo" class_tag="sidebar-item-create">
                        <span>Criar curso</span>
                    </NavLink>
                </>
            )}

            <NavLink
                url="/"
                class_tag="sidebar-item-logout"
                callback={() => {
                    logout(context);
                }}
            >
                <span>Sair</span>
            </NavLink>
        </>
    );
}

function LoginButton() {
    useEffect(() => {
        addEventCloseSidebar(document.getElementById("sidebar-item-login"));
        addEventCloseSidebar(document.getElementById("sidebar-item-register"));
    }, []);

    return (
        <>
            <NavLink url="/entrar" class_tag="sidebar-item-login">
                <span>Entrar</span>
            </NavLink>
            <NavLink url="/registrar" class_tag="sidebar-item-register">
                <span>Registrar</span>
            </NavLink>
        </>
    );
}

function addEventCloseSidebar(el: HTMLElement | null) {
    const checkbox = document.getElementById(
        "sidebar-input-checkbox"
    ) as HTMLInputElement;
    el?.addEventListener("click", () => (checkbox.checked = false));
}

interface NavigationList {
    description: string;
    url: string;
    children: NavigationListChildren[] | any;
}

interface NavigationListChildren {
    id: string;
    description: string;
    url: string;
}

function NavigationList() {
    const leftArrow = require("../../assets/images/white-left-arrow.png");
    const [navigationList, setNavigationList] = useState<NavigationList[]>([
        {
            description: "Inicio",
            url: "/",
            children: [],
        },
        {
            description: "Cursos",
            url: "/cursos",
            children: [],
        },
        // {
        //   description: "Categorias",
        //   url: "",
        //   children: [
        //     {
        //       id: '7a6dfdb',
        //       description: "Programação e TI",
        //       url: "/cursos?categoria=programacao_ti",
        //     },
        //     {
        //       id: 'a8s754',
        //       description: "Design e UX",
        //       url: "/cursos?categoria=design_ux",
        //     },
        //   ],
        // },
    ]);

    const { setTitle, setMessage, setType, setOpenedModal } = useModalContext();

    const [categorias, setCategorias] = useState<ListarCategorias[]>();

    useEffect(() => {
        listarCategorias()
            .then((response) => {
                if (response && response.data) {
                    let children = response.data;
                    children = children.map((child) => {
                        return {
                            id: child._id,
                            description: child.descricao,
                            url: "/cursos?categoria=" + child._id,
                        };
                    });

                    setNavigationList((nav) => [
                        ...nav,
                        {
                            description: "Categorias",
                            url: "",
                            children: children,
                        },
                    ]);
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

        const collection = document.getElementsByClassName(
            "sidebar-navigate-list-item-link"
        );
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].toString() != "[object HTMLSpanElement]")
                addEventCloseSidebar(collection[i] as HTMLElement);
        }

        const collectionChildren = document.getElementsByClassName(
            "sidebar-navigate-list-item-link-box-children-child"
        );

        for (let i = 0; i < collectionChildren.length; i++) {
            if (collectionChildren[i].toString() != "[object HTMLSpanElement]")
                addEventCloseSidebar(collectionChildren[i] as HTMLElement);
        }
    }, []);

    return (
        <div className="sidebar-navigate">
            <h4>Navegar</h4>
            <ul className="sidebar-navigate-list">
                {navigationList.map((item) => {
                    const hasChildren =
                        item.children && item.children.length > 0;

                    return (
                        <>
                            <li className="sidebar-navigate-list-item">
                                <DinamicNavigationItem
                                    url={item.url}
                                    hasChildren={hasChildren}
                                    class_tag="sidebar-navigate-list-item-link"
                                >
                                    <p>{item.description}</p>
                                    {item.children &&
                                        item.children.length > 0 && (
                                            <div className="sidebar-navigate-list-item-link-box">
                                                <input
                                                    type="checkbox"
                                                    id="sidebar-navigate-list-item-link-box-checkbox"
                                                    className="sidebar-navigate-list-item-link-box-checkbox"
                                                    hidden
                                                />
                                                <label
                                                    className="sidebar-navigate-list-item-link-box-label"
                                                    htmlFor="sidebar-navigate-list-item-link-box-checkbox"
                                                >
                                                    <img
                                                        className="sidebar-navigate-list-item-link-box-image"
                                                        src={leftArrow}
                                                    />
                                                </label>
                                                <div
                                                    className="sidebar-navigate-list-item-link-box-children"
                                                    hidden
                                                >
                                                    {item.children.map(
                                                        (item) => {
                                                            return (
                                                                <>
                                                                    <NavLink
                                                                        url={
                                                                            item.url
                                                                        }
                                                                        class_tag="sidebar-navigate-list-item-link-box-children-child"
                                                                    >
                                                                        {
                                                                            item.description
                                                                        }
                                                                    </NavLink>
                                                                    <Separator />
                                                                </>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </DinamicNavigationItem>
                            </li>
                            <Separator />
                        </>
                    );
                })}
            </ul>
        </div>
    );
}

function DinamicNavigationItem({
    hasChildren = false,
    class_tag = "",
    url,
    children,
}) {
    if (hasChildren) return <span className={class_tag}>{children}</span>;
    else
        return (
            <NavLink url={url} class_tag={class_tag}>
                {children}
            </NavLink>
        );
}

export default SideBar;
