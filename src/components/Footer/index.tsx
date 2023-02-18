import React from "react";
import "./style.scss";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-first-layer">
                <ul className="footer-first-layer-list">
                    <li className="footer-first-layer-list-item">
                        <a href="#" className="footer-first-layer-list-link">
                            Sobre nós
                        </a>
                    </li>
                    <li className="footer-first-layer-list-item">
                        <a href="#" className="footer-first-layer-list-link">
                            Contato
                        </a>
                    </li>
                    <li className="footer-first-layer-list-item">
                        <a href="#" className="footer-first-layer-list-link">
                            Termos
                        </a>
                    </li>
                    <li className="footer-first-layer-list-item">
                        <a href="#" className="footer-first-layer-list-link">
                            Políticas de privacidade
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-second-layer">
                <span className="footer-second-layer-copyright">
                    &#169; 2023 Cursu
                </span>
            </div>
        </footer>
    );
}

export default Footer;
