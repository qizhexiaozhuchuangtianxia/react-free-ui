
const splitPx = (str) => {
    let s = str.trim();
    let n = s.split('px');
    return parseInt(n[0]);
}
const setLineHeight = (style,lineHeight) => {
    style.lineHeight = style.height || lineHeight;
    return style;
}
export {
    splitPx,setLineHeight
};
