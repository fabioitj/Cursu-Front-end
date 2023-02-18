import "./style.scss";
import { Link } from "react-router-dom";

function NavLink({ url, class_tag = "", callback = () => {}, children }) {
    return (
        <Link to={url} className={class_tag} id={class_tag} onClick={callback}>
            {children}
        </Link>
    );
}

export default NavLink;
