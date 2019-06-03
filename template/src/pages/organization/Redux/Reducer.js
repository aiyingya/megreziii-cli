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
    editModal:false,
    parentList:[],// 父菜单列表
    btnRequestLoading:false,
    btnRequest:true,
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
        onShowSizeChange:action.payload.onChange
    }
});
actions[types.SET_DATAS]=(state, action) => ({...state,
    datas:action.payload
});
actions[types.SETFORMITEMS]=(state,action)=>({...state,formItems:action.payload || {}});
actions[types.SET_SEARCH_OBJ]=(state,action)=>({...state,searchObj:action.payload || {}});
actions[types.SET_PARENT_LIST]=(state,action)=>({...state,parentList:action.payload || {}});
actions[types.SET_All_LIST]=(state,action)=>({...state,allList:action.payload || {}});
actions[types.SET_UNIQUE]=(state,action)=>({...state,unique:action.payload || {}});
actions[types.BTN_LOADING_ACTIVE]=(state,action)=>({...state,btnRequestLoading:true});
actions[types.BTN_LOADING_DISPLAY]=(state,action)=>({...state,btnRequestLoading:false});
actions[types.BTN_REQUEST_ACTIVE]=(state)=>({...state,btnRequest:true});
actions[types.BTN_REQUEST_DISPLAY]=(state)=>({...state,btnRequest:false});
actions[types.ON_EXPAND_KEY]=(state,action)=>({...state,expandKey:action.payload || []});

export const reducer = handleActions(actions, initialState);
