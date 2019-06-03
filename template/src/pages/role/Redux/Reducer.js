import {handleActions} from 'redux-actions';
import types from "./ActionTypes";

let initialState = {
    loading: false,
    //显示资源加载中
    loadingR: false,
    datas: [],
    pagination: {
        current: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `总共${total}条 显示${range[0]}-${range[1]}条`,
        total: 0,
        size: 'small'
    },
    editModal:false,
    roleType:[],
    formItems:[],
    moduleTreeDatas:[],
    moduleTreeChecked:[],
    searchObj:{},
    resourceDatas:[],
    btnRequestLoading:false,
    btnRequest:true,
    //资源许可列表
    resourcePerms:[]
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
        onShowSizeChange:action.payload.onChange
    }
});
actions[types.setDatas]=(state, action) => ({...state,
    datas:action.payload
});
actions[types.QUERYROLETYPE]=(state,action)=>({...state,roleType:action.payload  || []});
actions[types.GETFORMITEMS]=(state,action)=>({...state,formItems:action.payload || []});
actions[types.SEARCHMODULE]=(state,action)=>({...state,moduleTreeDatas:action.payload || []});
actions[types.SEARCHMODULECHECKED]=(state,action)=>({...state,moduleTreeChecked:action.payload || []});
actions[types.setSearchObj]=(state,action)=>({...state,searchObj:action.payload || {}});
actions[types.setResourceDatas]=(state,action)=>({...state,resourceDatas:action.payload || []});
actions[types.SET_BTN_LOADING_ACTIVE]=(state)=>({...state,btnRequestLoading:true});
actions[types.SET_BTN_DLOADING_DISPLAY]=(state)=>({...state,btnRequestLoading:false});
actions[types.BTN_REQUEST_ACTIVE]=(state)=>({...state,btnRequest:true});
actions[types.BTN_REQUEST_DISPLAY]=(state)=>({...state,btnRequest:false});
actions[types.USER_RESOURCE]=(state,action)=>({...state,resourcePerms:action.payload || []});
actions[types.LOADING_START_R]=(state,action)=>({...state,loadingR:true});
actions[types.LOADING_END_R]=(state,action)=>({...state,loadingR:false});
export const reducer = handleActions(actions, initialState);
