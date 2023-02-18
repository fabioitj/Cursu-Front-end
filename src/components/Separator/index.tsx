import "./style.scss";

function Separator({ hasShadow = false }) {
    const className = hasShadow ? "separator separator-shadow" : "separator";

    return <hr className={className}></hr>;
}

export default Separator;
