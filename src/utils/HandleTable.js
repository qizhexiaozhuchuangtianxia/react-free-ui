import HandleTree from './HandleTree';
class HandleTable extends HandleTree {
    constructor(tree, option) {
        super(tree, option);
        this.initTable();
    }
    initTable = () => {
        this.tableList = this.setIndex(this.tree);
    }
    expandTree = (item) => {
        if(item.children && item.children.length>0){
            let newChild = this.setIndex(item.children,item.index+1);
            let list = this.tableList;

            // for(let i = item.index;i<list.length;i++){
            //     list.splice(i,0,)
            // }
            
            this.tableList.splice(item.index+1,0,...newChild);
        }
    }
    setIndex = (list,j=0) => {
        return list.map((item,i)=>{
            item.index = i+j;
            return item;
        })
    }
    excludeAttr = (obj, attrArr) => {
        let objAttrArr = Object.values(obj);
        for (let i = 0; i < attrArr.length; i++) {
            if (objAttrArr.indexOf(attrArr[i]) != -1) {
                delete obj[attrArr[i]];
            }
        }
        return obj;
    }
}


export default HandleTable;