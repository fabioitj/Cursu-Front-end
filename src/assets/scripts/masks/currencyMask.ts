const currencyMask = (e: string, prefix: string = "", max: string = "") => {
    if(e === prefix)
        return "";
    
    e = e.replace(/\D/g, "");
    e = e.replace(/(\d)(\d{2})$/, "$1,$2");
    e = (prefix ? `${prefix}` : "") + e.replace(/(?=(\d{3})+(\D))\B/g, ".");

    if(max !== "") {
        const maxFloat = parseFloat(max);
        const eFloat = parseFloat(e.substring(prefix.length, e.length));
        
        if(eFloat >= maxFloat) {
            return prefix + maxFloat.toString().replace(".", ",");
        }
    }
    return e;
};

export { currencyMask }; 