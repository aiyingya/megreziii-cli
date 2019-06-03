import {Global, PickChildrenTree} from 'winning-megreziii-utils';
const getFormSearch = (value = {},page = 1,pageSize =10) =>{
    return {
        yh_mc: typeof(value.yh_mc) === 'undefined' ? '': value.yh_mc,
        zw: (value.zw == "全部" || typeof(value.zw) === 'undefined') ? '' : value.zw,
        pageIndex: page,
        pageSize: pageSize
    }
}
const rowSelectionTree =(self)=>{
	let oneTree=new PickChildrenTree(self.props.state.orgTreeDatas,'org_id')
	let _rowSelectionTree = {
		selectedRowKeys:self.props.state.orgTreeCheckedKeys || [],
		onSelect: (record, selected, selectedRows) => {
			let resultKeys = oneTree.CheckedOneKeysResult(_rowSelectionTree.selectedRowKeys,record,selected)
			self.props.userOrganizationOperate.setChecked(resultKeys);
		},
		onSelectAll: (selected, selectedRows, changeRows) => {
			let resultKeys = oneTree.CheckedAllKeysResult(selectedRows,selected)
			self.props.userOrganizationOperate.setChecked(resultKeys);
		},
	}
	return _rowSelectionTree;
}

/* 用户启用禁用状态取反*/
const adverseEnable = (enableVal) => {
    if (enableVal == Global.EnableValue.Enable) {
        return Global.EnableValue.Stop;
    }
    return Global.EnableValue.Enable;
}

export default {
    // 获取列表上方搜索表单的数据
  	getFormSearch,
    // 初始化编辑中机构列表的选中数据
    rowSelectionTree,
	// 用户启用禁用状态取反
    adverseEnable
}