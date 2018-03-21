
const splitPx = (str) => {
    let s = str.trim();
    let n = s.split('px');
    return parseInt(n[0]);
}
const setLineHeight = (style, lineHeight) => {
    style.lineHeight = style.height || lineHeight;
    return style;
}

const getViewPortWidth = () => {
    return document.documentElement.clientWidth || document.body.clientWidth;
}
const getViewPortHeight = () => {
    return document.documentElement.clientHeight || document.body.clientHeight;
}
const getParents = (ele, parent) => {
    let p = parent;
    let h = false;
    if(!ele || !parent) return;
    function pp(ele) {
        console.log(h,2222222222)
        if(h) return;
        if (ele == p) { 
            h =true;
            return; 
        };
        console.log(ele.parentNode, p)
        if (ele.parentNode && ele.parentNode == p) {
            h =true;
            return;
        } 
        if(!h){
            pp(ele.parentNode, p);
        }
    }
   // pp(ele);
    console.log(h,ele.parentNode==parent)
    return h;
}

const excludeAttr = (obj, attrArr) => {
    let newO = JSON.parse(JSON.stringify(obj));
    let objAttrArr = Object.keys(newO);
    for (let i = 0; i < attrArr.length; i++) {
        if (objAttrArr.indexOf(attrArr[i]) != -1) {
            delete newO[attrArr[i]];
        }
    }
    return newO;
}
export {
    splitPx,
    setLineHeight,
    getViewPortWidth,
    getViewPortHeight,
    getParents,
    excludeAttr,
};
