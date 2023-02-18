import "./style.scss";
import { ChangeEvent, useState } from "react";
import { isNull } from "../../assets/scripts/base";
import { useEffect } from "react";

function SelectBox({
    list,
    value,
    setValue,
    defaultOption = "Selecione uma opção",
}) {
    useEffect(() => {
        if (isNull(value)) {
            const select = document.getElementById(
                "select-box"
            ) as HTMLSelectElement;
            select.value = "";
        }
    }, [value]);

    return (
        <select
            className="select-box"
            id="select-box"
            value={value ? value : ""}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setValue(e.target.value);
            }}
        >
            <option hidden disabled id="default-option" value={""}>
                {defaultOption}
            </option>
            {list &&
                list.map((item, index) => {
                    return (
                        <option className="select-box-item" value={item._id}>
                            {item.descricao}
                        </option>
                    );
                })}
        </select>
    );
}

export default SelectBox;
