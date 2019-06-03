import { createStore, applyMiddleware } from 'redux';
import {reducer} from './Reducer';
import {loadingStart,loadingEnd,search,setFormItems,setSearchObj,setDatas,setParentList,
	setBtnLoadingActive,setBtnLoadingDisplay,
    setBtnRequestActive,
    setBtnRequestDisplay
} from './Actions';
import api from "../../../api/ModuleApi";
import {Global} from 'winning-megreziii-utils';

import curUtil from "../Util";
export const store = createStore(reducer);

export const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    };
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        module:{
            initTable:async (_this,{value ={},page = 1,pageSize =10,isFrozenPaging = false}={}) => {
                //初始化分页Table
                // When：进入页面/点击查询
                dispatch(loadingStart());
                // 是否冰冻页面来初始化当前展示哪一页
                if (isFrozenPaging) {
                    page =_this.props.state.pagination.current;
                    pageSize = _this.props.state.pagination.pageSize;
                    value =_this.props.state.searchObj;
                }
                // 查询条件
                let searchObj = curUtil.getFormSearch(value,page,pageSize);
                // 查询数据
                let result = await api.ModuleList(searchObj);
                Global.alert(result,{
                    successFun:()=>{
                        // 显示模块树-基础服务这里是平级的
                        // let tree = Global.changeDatasToTree({dataList:result.datas,id:'mk_id',parentId:'sj_mk_id'})
                        // result.datas = tree
                        result.onChange = (_page, _pageSize)=>{
                            // 绑定分页按钮点击事件
                            _this.props.module.initTable(_this,{value:_this.props.state.searchObj,page:_page, pageSize:_pageSize});
                        }
                        // 写入查询条件，在上方[看上方代码]分页点击时传入查询条件_this.props.state.searchObj
                        dispatch(setSearchObj(searchObj));
                        // 写入Table数据
                        dispatch(search(result));
                    },
                    isSuccessAlert:false
                })
                dispatch(loadingEnd());
                return result;
            },
            initSearch:async (searchVal)=>{
                // 初始化查询条件
                let forms = [
                    {labelName: '菜单名称', formType: Global.SelectEnum.INPUT, name: 'mk_mc'}
                ]
                // 写入查询初始值
                if (searchVal) {
                    forms = Global.setFormsValue(forms,searchVal);
                }
                // 写入查询Form，用于显示查询组件内容
                dispatch(setFormItems(forms));
            },
            setOperateToDatas:(result)=>{
                // 更新Table Dada数据
                dispatch(setDatas(result));
            },
            handleRemove:async (_this,record)=>{
                //删除
                dispatch(loadingStart());
                let result = await api.ModuleRemove({mk_ids: Array.of(record.mk_id)});
                Global.alert(result,{successFun:()=>{
                    _this.props.module.initTable(_this,{isFrozenPaging:true});
                }})
                dispatch(loadingEnd());
            }
        },
        moduleOperate:{
            initParentMenus:async ()=>{
                // 初始化上级菜单列表
                let result = await api.ModuleParent();
                dispatch(setParentList(result.dicts.SJMK));
            },
            handleOperate:async (record,fun) => {
                //新增 Or 更新
                dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
                let result = await api.ModuleUpdate(record).finally(() => {
	                // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000)
	                dispatch(setBtnLoadingDisplay());
                    setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000);
                });
                Global.alert(result,{successFun:fun});
            }
        }
    }
}