import {Global} from 'winning-megreziii-utils';

const getFormSearch = (value = {}) =>{
    return {
        org_name: typeof(value.org_name) === 'undefined' ? '': value.org_name
    }
}

/**
 * 根据列表树提供的id键名 和 name键名，返回antd TreeSelect组件规定的树结构
 * @param treeData 包含children的树结构数据
 * @param id  键名,值用来当作TreeSelectid key 和 id
 * @param name 键名,值用来当作TreeSelectid title
 * @returns {{key: string, value: string, title: string, children: Array}}
 */
const getTree = (treeData,{id,name})  =>{
    let tree = Global.changeDatasToTreeSelect(treeData,{id,name});
    return {
        key : Global.TopMenuValue,
        value : Global.TopMenuValue,
        title : "无",
        children: tree
    }
}

export default {
    getFormSearch,
    getTree
}