import { ChangeEvent, useEffect } from "react";
import { currencyMask } from "../../assets/scripts/masks/currencyMask";
import Option from "../../models/Option";
import "./styles.scss";

interface FieldProps {
    title?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    readonly?: boolean;
    value: any;
    setValue: React.Dispatch<any>;
    field?: string;
    tamanho?: string;
    prefix?: string;
    max?: string;
    showMax?: boolean;
    options?: Option[];

    showImage?: boolean;
    image?: string | File | File[];
    code?: string;

    fileAccept?: string;
}

const initializeDefault = (e: FieldProps) => {
    const newE: FieldProps = {
        title: e.title ? e.title : "",
        placeholder: e.placeholder ? e.placeholder : "",
        type: e.type ? e.type : "",
        name: e.name ? e.name : "",
        readonly: e.readonly ? e.readonly : false,
        value: e.value,
        setValue: e.setValue,
        field: e.field ? e.field : "input",
        tamanho: e.tamanho ? e.tamanho : "12",
        prefix: e.prefix ? e.prefix : "",
        max: e.max ? e.max : "",
        showMax: e.showMax ? e.showMax : false,
        options: e.options ? e.options : undefined,
        showImage: e.showImage ? e.showImage : false,
        image: e.image ? e.image : undefined,
        code: e.code ? e.code : "",
        fileAccept: e.fileAccept ? e.fileAccept : ".png"
    };

    return newE;
};

function Field(props: FieldProps) {
    const {
        title,
        placeholder,
        type,
        name,
        readonly,
        value,
        setValue,
        field,
        tamanho,
        prefix,
        max,
        showMax,
        options, // in case of a radiobutton or checkbox
        image,
        showImage,
        code,
        fileAccept
    } = initializeDefault(props);

    const className =
        "field-" +
        field +
        " " +
        (field !== "checkbox" && field !== "radio" ? "field-" + tamanho : "");
    const id = "field-" + field + "-" + code;

    return (
        <div className="field">
            {title !== "" && <p className="field-title">{title}</p>}
            {field == "input" && (
                <input
                    className={className}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setValue(e.target.value);
                    }}
                    readOnly={readonly}
                    autoFocus={true}
                />
            )}
            {field == "textarea" && (
                <textarea
                    className={className}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setValue(e.target.value);
                    }}
                    readOnly={readonly}
                ></textarea>
            )}
            {field == "file" && (
                <>
                    <input
                        className={className}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            e.target.files && setValue(e.target.files);
                        }}
                        readOnly={readonly}
                        accept={fileAccept}
                    />
                    <label className={"field-label"} htmlFor={id}>
                        {image && showImage ? (
                            <img
                                className="field-label-image"
                                src={image as string}
                                alt="Imagem"
                            />
                        ) : image && !showImage ? <strong>&#10003;</strong> : (
                            <strong>{placeholder}</strong>
                        )}
                    </label>
                </>
            )}
            {/* {field == "radio" && (
                <>
                    {options?.map((option: Option) => {
                            const checked : boolean | null = option.checked ? true : null;

                            return (
                            <>
                                <input
                                    className={className + " "}
                                    id={id}
                                    placeholder={placeholder}
                                    type={field}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setValue(option.value);
                                    }}
                                    readOnly={readonly}
                                    name={name}
                                    checked={checked as boolean}
                                />

                                <label htmlFor={id}>{option.description}</label>
                            </>
                            )
                        })}
                </>
            )} */}
            {/* {field == "checkbox" && (
                <>
                    <input
                        // className={className}
                        id={id}
                        placeholder={placeholder}
                        type={field}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setValue(e.target.checked);
                        }}
                        readOnly={readonly}
                        name={name}
                    />
                </>
            )} */}
            {field == "money" && (
                <input
                    className={className}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setValue(currencyMask(e.target.value, prefix, max));
                    }}
                    readOnly={readonly}
                />
            )}
            {showMax && (
                <span className="field-max">
                    (máximo: {prefix} {max})
                </span>
            )}
        </div>
    );
}

// function Field({
//     title = "",
//     placeholder = "",
//     type = "",
//     name = "",
//     readonly = false,
//     value,
//     setValue,
//     field = "input",
//     tamanho = "12",
//     prefix = "",
//     max = "",
//     showMax = false,
//     options = [], // in case of a radiobutton
// }) {
//     const className =
//         "field-" +
//         field +
//         " " +
//         (field !== "checkbox" && field !== "radio" ? "field-" + tamanho : "");
//     const id = "field-" + field;

//     return (
//         <div className="field">
//             {title !== "" && <p className="field-title">{title}</p>}
//             {field == "input" && (
//                 <input
//                     className={className}
//                     placeholder={placeholder}
//                     type={type}
//                     value={value}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                         setValue(e.target.value);
//                     }}
//                     readOnly={readonly}
//                 />
//             )}
//             {field == "textarea" && (
//                 <textarea
//                     className={className}
//                     placeholder={placeholder}
//                     value={value}
//                     onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
//                         setValue(e.target.value);
//                     }}
//                     readOnly={readonly}
//                 ></textarea>
//             )}
//             {field == "file" && (
//                 <>
//                     <input
//                         className={className}
//                         id={id}
//                         placeholder={placeholder}
//                         type={type}
//                         onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                             e.target.files && setValue(e.target.files[0]);
//                         }}
//                         readOnly={readonly}
//                     />
//                     <label className={"field-label"} htmlFor={id}>
//                         <strong>{placeholder}</strong>
//                     </label>
//                 </>
//             )}
//             {field == "radio" && (
//                 <>
//                     {options && options.map((option: Option) => {
//                         <>
//                         <input
//                             className={className}
//                             id={id}
//                             placeholder={placeholder}
//                             type={field}
//                             onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                 setValue(option.value);
//                             }}
//                             readOnly={readonly}
//                             name={name}
//                         />;
//                         <label htmlFor={id}>{option.description}</label>
//                         </>
//                     })}
//                 </>
//             )}
//             {field == "checkbox" && (
//                 <>
//                     <input
//                         // className={className}
//                         id={id}
//                         placeholder={placeholder}
//                         type={field}
//                         onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                             setValue(e.target.checked);
//                         }}
//                         readOnly={readonly}
//                         name={name}
//                     />
//                 </>
//             )}
//             {field == "money" && (
//                 <input
//                     className={className}
//                     placeholder={placeholder}
//                     type={type}
//                     value={value}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                         setValue(currencyMask(e.target.value, prefix, max));
//                     }}
//                     readOnly={readonly}
//                 />
//             )}
//             {showMax && (
//                 <span className="field-max">(máximo: {prefix + max})</span>
//             )}
//         </div>
//     );
// }

export default Field;
