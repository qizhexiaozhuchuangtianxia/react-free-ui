
const splitPx = (str) => {
    let s = str.trim();
    let n = s.split('px');
    return parseInt(n[0]);
}
const setLineHeight = (style,lineHeight) => {
    style.lineHeight = style.height || lineHeight;
    return style;
}

const getViewPortWidth = ()  => {
     return document.documentElement.clientWidth || document.body.clientWidth;
}
const getViewPortHeight = ()  => {
    return document.documentElement.clientHeight || document.body.clientHeight;
}
export {
    splitPx,
    setLineHeight,
    getViewPortWidth,
    getViewPortHeight
};
