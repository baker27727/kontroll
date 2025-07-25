export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const nullifyEmptyString = (str: string) => str === '' ? null : str;
