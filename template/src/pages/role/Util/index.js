import {PickChildrenTree} from 'winning-megreziii-utils';

const getFormSearch = (value = {},page = 1,pageSize =10) =>{
    let searctObj ={
        js_mc: typeof(value.js_mc) === 'undefined' ? '': value.js_mc,
        js_lx: (value.js_lx == "全部" || typeof(value.js_lx) === 'undefined') ? '' : value.js_lx,
        pageIndex: page,
        pageSize: pageSize
    }
    return searctObj;
}
const rowSelectionTree = (self)=>{
    let oneTree=new PickChildrenTree(self.props.state.moduleTreeDatas,'mk_id')
    let _rowSelectionTree = {
       selectedRowKeys: self.props.state.moduleTreeChecked,
       onSelect: (record, selected, selectedRows) => {
           let resultKeys = oneTree.CheckedOneKeysResult(_rowSelectionTree.selectedRowKeys,record,selected)
           self.props.roleModuleOperate.setChecked(resultKeys);
       },
       onSelectAll: (selected, selectedRows, changeRows) => {
           let resultKeys = oneTree.CheckedAllKeysResult(selectedRows,selected)
           self.props.roleModuleOperate.setChecked(resultKeys);
       },
   }
    return _rowSelectionTree;
}
export default {
    // 获取列表上方搜索表单的数据
    getFormSearch,
    // 初始化编辑中模块列表的选中数据
    rowSelectionTree
    // exportModuleTree : (dataList = []) => {
    //     // 返回table columns的树结构
    //     let moduleTree = []
    //     let _beforeLever = -1
    //     let _childArray ={}
    //
    //     dataList && dataList.forEach((item)=>{
    //         switch (item.$$treeLevel){
    //             case 0:
    //                 if(_beforeLever !== -1){
    //                     // _childArray有值
    //                     moduleTree.push(_childArray)
    //                     _childArray = {}
    //                     _beforeLever = 0
    //                 }
    //                 _childArray = item;
    //                 break;
    //             case 1:
    //                 _childArray.children = _childArray.children ? _childArray.children : []
    //                 _childArray.children.push(item)
    //                 _beforeLever = 1
    //                 break;
    //             default:
    //                 break;
    //         }
    //     })
    //
    //     if(!_.isEmpty(_childArray)){
    //         moduleTree.push(_childArray)
    //         return moduleTree
    //     }
    //     return null;
    // },

}