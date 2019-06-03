import {handleActions} from 'redux-actions';
import types from "./ActionTypes";

let initialState = {
    loading: false,
    datas: [],
    pagination: {
        current: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `总共${total}条 显示${range[0]}-${range[1]}条`,
        total: 0,
        size: 'small'
    },
    editRoleModal:false,
    roleList:[],
    userRoleListKeys:[],
    btnRequestLoading:false,
    btnRequest:true,
    //资源许可列表
    resourcePerms:[],
    expandKey:[]
};

const actions={};

actions[types.LOADINGSTART]=(state,action)=>({...state,loading:true});
actions[types.LOADINGEND]=(state,action)=>({...state,loading:false});
actions[types.SEARCH]=(state, action) => ({...state,
    datas:action.payload.datas,
    pagination:{
        ...state.pagination,
        current: action.payload.pageIndex,
        total: action.payload.total,
        pageSize: action.payload.pageSize,
        onChange:action.payload.onChange,
        onShowSizeChange:action.payload.onChange,
    }
});
actions[types.SET_DATAS]=(state, action) => ({...state,
    datas:action.payload
});
actions[types.QUERYJOBTITLE]=(state,action)=>({...state,jobTitle:action.payload || {}});
actions[types.GETFORMITEMS]=(state,action)=>({...state,formItems:action.payload || {}});
actions[types.setSearchObj]=(state,action)=>({...state,searchObj:action.payload || {}});
actions[types.ORG_TREE_DATAS]=(state,action)=>({...state,orgTreeDatas:action.payload || []});
actions[types.ORG_TREE_CHECKED]=(state,action)=>({...state,orgTreeCheckedKeys:action.payload || []});
actions[types.SHOW_ROLE_EDIT]=(state,action)=>({...state,editRoleModal:!state.editRoleModal});
actions[types.SET_ROLE_LIST]=(state,action)=>({...state,roleList:action.payload || []});
actions[types.SET_USER_ROLE_LIST]=(state,action)=>({...state,userRoleListKeys:action.payload || []});
actions[types.SET_USER]=(state,action)=>({...state,user:action.payload || []});
actions[types.SET_BTN_LOADING_ACTIVE]=(state)=>({...state,btnRequestLoading:true});
actions[types.SET_BTN_DLOADING_DISPLAY]=(state)=>({...state,btnRequestLoading:false});
actions[types.BTN_REQUEST_ACTIVE]=(state)=>({...state,btnRequest:true});
actions[types.BTN_REQUEST_DISPLAY]=(state)=>({...state,btnRequest:false});
actions[types.ORG_FORM_ITEMS]=(state,action)=>({...state,orgFormItems:action.payload || {}});
actions[types.USER_RESOURCE]=(state,action)=>({...state,resourcePerms:action.payload || []});
actions[types.ON_EXPAND_KEY]=(state,action)=>({...state,expandKey:action.payload || []});

export const reducer = handleActions(actions, initialState);
