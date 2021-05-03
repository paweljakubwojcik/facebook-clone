const scrollBar = (primary, secondary) => `
        scrollbar-width: thin;          
        scrollbar-color: ${secondary} ${primary};   /* scroll thumb & track */
        &::-webkit-scrollbar {
            width: 12px;
        }
        &::-webkit-scrollbar-track {
            background:${primary};
        }
        &::-webkit-scrollbar-thumb {
            background-color: ${secondary};
            border-radius: 20px;
            width: 12px;
        }`

export const darkTheme = {
    backgroundColor: '#18191a',
    primaryColor: 'rgb(44, 143, 248)',
    primaryElementColor: '#242526',
    secondaryElementColor: '#333436',
    secondaryElementHover: '#898989',
    secondaryFontColor: '#707070',
    primaryFontColor: '#fff',
    roundButtonColor: '#333436',
    activeButtonColor: '#2d4a67',
    shadowColor: '#121215ba',
    standardShadow: '-5px 5px 20px -5px #121215ba',
    smallShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
    borderColor: '#333436',
    errorColor: '#f75656',
    scrollBar: scrollBar('#242526', '#787878'),
}

export const lightTheme = {
    backgroundColor: '#f0f2f5',
    primaryColor: 'rgb(6, 87, 242)',
    primaryElementColor: '#fff',
    secondaryElementColor: '#ddd',
    secondaryElementHover: '#ccc',
    secondaryFontColor: '#4d4d4d',
    primaryFontColor: '#000',
    roundButtonColor: '#e4e6eb',
    activeButtonColor: '#72b7fd',
    shadowColor: '#121215ba',
    standardShadow: '-5px 5px 20px -10px #12121599',
    smallShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;',
    borderColor: '#e3e4e6',
    errorColor: '#f75656',
    scrollBar: scrollBar('#fff', '#bbb'),
}
