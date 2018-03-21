/**
 * 参数说明
 * HandleTree 接受两个参数
 * tree 数据
 * option 配置 {checkbox: Boolean}
 **/
class HandleTree {
    constructor(tree,option) {
        this.tree = tree || [];
        if (!Array.isArray(tree)) {
            this.tree = [tree];
        }
        if(option){
            for(let o in option){
                this[o] = option[o];
            }
        }
        this.tree = JSON.parse(JSON.stringify(this.tree));
        this.initTree();
        this.initCheckedStatus();
        this.tileTree();
    }
    // 初始化
    initTree = () => {
        let tree = this.tree;
        let res = [];
        let id = 0;
        res.push(...tree);
        for (let i = 0; i < res.length; i++) {
            let cur = res[i];
            if (!cur.level) {
                cur.level = 0;
            }
            if (cur.level == 0) {
                cur.pid = -1;
                cur.index = i;
                cur.rootid = i;
            }
            cur.id = i;
            if (cur.children && cur.children.length > 0) {
                res.push(...cur.children.map((item, index) => {
                    item.level = cur.level + 1;
                    item.pid = cur.id;
                    item.index = index;
                    item.rootid = cur.rootid;
                    return item;
                }))
            }
        }
        this.list = res;
    }
    // 获取当前tree
    getTree = () => {
        return this.tree;
    }
    // item当前要插入的元素, target目标元素, level 0插入到同级 1插入到子级, index插入的索引位置
    insert = (item, target, level, index) => {
        let itemc = JSON.parse(JSON.stringify(item));
        if (itemc.deleteSign) { delete itemc.deleteSign };
        let isNewCreate = itemc.id >= 0 ? false : true;
        let insertIndex = index >= 0 ? index : this.tree.length;
        
        // 插入到根目录
        if ((!target || target.pid === -1) && level===0) {
            itemc.pid = -1;
            itemc.level = 0;
            if (!(itemc.id >= 0)) {
                itemc.id = this.tree.length;
            }
            this.tree.splice(insertIndex, 0, itemc);
            this.tree = this.setChildrenIndex(this.tree);
            return;
        }
        this.list.forEach((cur, j) => {
            // 同级
            if (level === 0 && cur.id === target.pid) {
                let newItem = this.setItemAttr(cur, itemc);
                cur.children.splice((insertIndex > -1 ? insertIndex : cur.children.length), 0, newItem)
                cur.children = this.setChildrenIndex(cur.children);
            }
            //子级
            if (level === 1 && cur.id === target.id) {
                if (!cur.children) {
                    cur.children = [];
                }
                let newItem = this.setItemAttr(cur, itemc);
                cur.children.splice((insertIndex > -1 ? insertIndex : cur.children.length), 0, newItem)
                cur.children = this.setChildrenIndex(cur.children);
            }
        });
        return this.tree;
    }
    // 删除节点
    remove = (item, deleteSign) => {
        let tree = this.tree;
        const loopTree = (data) => {
            for (var i = 0; i < data.length; i++) {
                var cur = data[i];
                if (deleteSign && cur.deleteSign) {
                    if (cur.id === item.id && cur.level === item.level) {
                        data.splice(i, 1);
                        this.removeList();
                        return tree;
                    }
                } else if (!deleteSign) {
                    if (cur.id === item.id && cur.level === item.level) {
                        data.splice(i, 1);
                    }
                }
                if (cur.children) {
                    loopTree(cur.children);
                }
            }
        }
        loopTree(tree);
        this.removeList();
        this.tree = tree;
    }
    removeList = (item) => {
        let res = [];
        res.push(...this.tree);
        for (let i = 0; i < res.length; i++) {
            let cur = res[i];
            if (cur.children && cur.children.length > 0) {
                res.push(...cur.children.map((item) => {
                    return item;
                }));
            }
        }
        this.list = res;
    }
    // 设置item属性 
    setItemAttr = (cur, item) => {
        item.pid = cur.id;
        item.id = item.id >= 0 ? item.id : this.list.length;
        item.rootid = cur.rootid;
        item.level = cur.level + 1;
        return item;
    }
    // 设置children 索引
    setChildrenIndex = (children) => {
        let child = children || [];
        child.map((item, j) => {
            item.index = j;
            return item;
        });
        return child;
    }
    // 拉平树形结构存放到数组中
    tileTree = () => {
        let res = [];
        let tree = this.tree;
        const loopTree = (data) => {
            for (var i = 0; i < data.length; i++) {
                var cur = data[i];
                res.push(cur);
                if (cur.children && cur.children.length > 0) {
                    loopTree(cur.children);
                }
            }
        }
        loopTree(tree);
        this.tileList = res;
    }
    // 获取要移动节点的索引值
    getMoveIndex = (item) => {
        let tileList = this.tileList;
        for (let i = 0; i < tileList.length; i++) {
            if (item.id === tileList[i].id) {
                return i;
            }
        }
    }
    // 上移 
    moveUp = (item) => {
        let itemIndex = item.index;
        if(itemIndex===0){return};
        item.deleteSign=true; 
        let index = this.getMoveIndex(item);
        let tileList = this.tileList;
        this.insert(item, tileList[index - 1], 0, itemIndex - 1);
        // 当前节点下移动
        // if (itemIndex > 0) {
        //     this.insert(item, tileList[index - 1], 0, itemIndex - 1);
        //     // 跨节点移动
        // } else {
        //     this.insert(item, tileList[index - 2], 0);
        // }
        this.remove(item,true);
    }
    // 下移
    moveDown = (item) => {
        let itemIndex = item.index;
        let index = this.getMoveIndex(item);
        let len = this.getMoveDownChildLen(item);
        let tileList = this.tileList;
        item.deleteSign=true; 
        if (itemIndex === len - 1) { return; }
        let nextItem = tileList[index + 1];
        if (item.pid === nextItem.pid) {
            this.insert(item, tileList[index + 1], 0, itemIndex +2);
        }
        this.remove(item,true);
    }
    getMoveDownChildLen = (item) => {
        let list = this.list;
        for (let i = 0; i < list.length; i++) {
            if (item.pid === list[i].id) {
                if(list[i].children){
                    return list[i].children.length;
                }
            }
        }
    }
    // 编辑
    editTree = (item) => {
        let list = this.list;
        list.forEach((cur) => {
            if(item.id === cur.id){
                cur = item;
                return;
            }
        });
    }
    // 初始化勾选状态
    initCheckedStatus = () => {
        if(!this.checkbox){return};
        let list = this.list;
        for (let i = list.length - 1; i >= 0; i--) {
            this.setCheck(list[i], list[i].children);
        }
    }
    setCheck = (cur, children) => {
        if (!children || children.length===0) {
            if (cur.checked) {
                cur.checkedStatus = 1;
                cur.checked = true;
            } else {
                cur.checkedStatus = 0;
                cur.checked = false;
            }
            return;
        }
        let len = children.length;
        let sign = 0;
        let hasStateus2 = false;
        children.forEach((item,j) => {
            if (children[j].checkedStatus === 2) {
                hasStateus2 = true;
            }
            if (children[j].checked) {
                sign++;
            }
        });
        if (sign === 0) {
            cur.checkedStatus = 0;
            cur.checked = false;
        } else if (sign === len) {
            cur.checkedStatus = 1;
            cur.checked = true;
        }
        if ((sign > 0 && sign < len) || hasStateus2) {
            cur.checkedStatus = 2;
        }

    }
    checkedItemStatus = (item) => {
        item.checked = item.checked ? false : true;
        if (item.checked) {
            item.checkedStatus = 1;
        } else {
            item.checkedStatus = 0;
        }
        return item;
    }
    checked = (item) => {
        this.checkedItemStatus(item);
        const loopItem = (child) => {
            if (child && child.length > 0) {
                for (let i = 0; i < child.length; i++) {
                    child[i].checked = item.checked;
                    if (item.checked) {
                        child[i].checkedStatus = 1;
                    } else {
                        child[i].checkedStatus = 0;
                    }
                    if (child[i].children) {
                        loopItem(child[i].children);
                    }
                }
            }
        }
        loopItem(item.children);
        return item;
    }
    checkedParents = (item, tree) => {
        let itemPid = item.pid;
        const loopItem = (data) => {
            for (let i = 0; i < data.length; i++) {
                let curData = data[i];
                let upSign = false;
                if (itemPid === curData.id) {
                    itemPid = curData.pid;
                    upSign = true;
                    this.setCheck(curData, curData.children);
                }
                if (upSign) {
                    loopItem(tree);
                } else {
                    if (curData.children && curData.children.length > 0) {
                        loopItem(curData.children);
                    }
                }
            }
        }
        loopItem(tree);
        this.tree = tree;
    }
    setClickStatus = (item) => {
        this.list.forEach((cur) =>{
            if(item.id === cur.id){
                cur.clickStatus = cur.clickStatus ? false : true;
            }else{
                cur.clickStatus = false;
            }
        });
    }
    search = (str) => {
        this.tileList.forEach((item) => {
            item.open = false;
            if(item.name.indexOf(str)!=-1){
                item.match = true;
                item.open = true;
            }else{
                item.match = false;
            }
        });
        this.searchParents();
    }
    // searchParents = (item, tree) => {
    //     let itemPid = item.pid;
    //     const loopItem = (data) => {
    //         for (let i = 0; i < data.length; i++) {
    //             let curData = data[i];
    //             curData.open=false;
    //             let upSign = false;
    //             if (itemPid === curData.id && item.match) {
    //                 itemPid = curData.pid;
    //                 upSign = true;
    //                 curData.open=true;
    //             }
    //             if (upSign) {
    //                 loopItem(tree);
    //             } else {
    //                 if (curData.children && curData.children.length > 0) {
    //                     loopItem(curData.children);
    //                 }
    //             }
    //         }
    //     }
    //     loopItem(tree);
    //     this.tree = tree;
    // }
    searchParents = () =>{
        let list = this.tileList;
        for(let i=list.length-1;i>0;i--){
            let item = list[i];
            
            if(item.open){
                for(let j=i-1;j>0;j--){
                    if(list[j].id === item.pid){
                        list[j].open= true;
                    }
                }
            }
        }
        console.log(this.tree,'tree')
    }
}

export default HandleTree;