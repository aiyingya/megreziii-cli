import { createStore, applyMiddleware } from 'redux';
import {reducer} from './Reducer';
import {loadingStart,loadingEnd,search,setFormItems,setSearchObj,setDatas,setParentList,setAllList,setUnique,
	setBtnLoadingActive,setBtnLoadingDisplay,setBtnRequestActive, setBtnRequestDisplay,setExpandKey} from './Actions';
import api from "../../../api/OrganizationApi";
import {Global} from 'winning-megreziii-utils';
import curUtil from "../Util";
import _ from "lodash";
export const store = createStore(reducer);

export const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    };
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        organization:{
            initTable:async (_this,{value ={},isFrozenPaging = false}={}) => {
                //初始化分页Table
                // When：进入页面/点击查询
                dispatch(loadingStart());
                if (isFrozenPaging) {
                    value =_this.props.state.searchObj;
                }
                // 查询条件
                let searchObj = curUtil.getFormSearch(value);
                // 查询数据
                let isSearchAll = _.isEmpty(value.org_name) ? true : false;
                let result = isSearchAll ? await api.OrgList(searchObj) : await api.OrgTree(searchObj);
                Global.alert(result,{
                    successFun:()=>{
                        // 显示模块树-基础服务这里是平级的
                        let tree = isSearchAll ? Global.changeDatasToTree({dataList:result.datas,id:'org_id',parentId:'parent_org_id'}) :result.datas;
                        result.datas = tree;

                        //默认查询全部，不展开节点
                        let expandKey =[];
                        if (isFrozenPaging) {
                            // 是否冰冻页面来展开当前展示的节点
                            expandKey = _this.props.state.expandKey;
                        }else if (!isSearchAll) {
                            //在用户有条件查询的时候（isFrozenPaging=false），展开从上到下第一个没有兄弟节点的子节点
                            if (tree.length>0) {
                                let formap =(oneChild)=>{
                                    expandKey.push(oneChild["org_id"])
                                    if (oneChild.children && oneChild.children.length) {
                                        formap(oneChild.children[0])
                                    }else{
                                        expandKey.push(oneChild["org_id"])
                                    }
                                }
                                formap(tree[0])
                            }
                        }
                        dispatch(setExpandKey(expandKey));
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
            setExpandKey:(key)=>{
                dispatch(setExpandKey(key));
            },
            initSearch:async (searchVal)=>{
                // 初始化查询条件
                let forms = [
                    {labelName: '机构名称', formType: Global.SelectEnum.INPUT, name: 'org_name'}
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
                let result = await api.OrgRemove({org_ids: Array.of(record.org_id)});
                Global.alert(result,{successFun:()=>{
                    _this.props.organization.initTable(_this,{isFrozenPaging:true});
                }})
                dispatch(loadingEnd());
            }
        },
        organizationOperate:{
            initUnique:async (id)=>{
                // 获取当前对象
                let result = await api.OrgUnique({id});
                dispatch(setUnique(result.data));
                return result.data;
            },
            initMenus:async ()=>{
                // 初始化机构列表
                let result = await api.OrgList();
                Global.alert(result,{
                    successFun:()=>{
                        // 显示模块树-基础服务这里是平级的
                        let tree = Global.changeDatasToTree({dataList:result.datas,id:'org_id',parentId:'parent_org_id'});
                        tree = curUtil.getTree(tree,{id:'org_id',name:'org_name'});
                        dispatch(setAllList(tree));
                    },
                    isSuccessAlert:false
                })
            },
            initParentMenus:async (parent_org_name)=>{
                // 初始化上级列表
                let result = await api.OrgParentValue({parent_org_name});
                dispatch(setParentList(tree));
            },
            handleOperate:async (record,fun) => {
                //新增 Or 更新
                dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
                let result = await api.OrgUpdate(record).finally(() => {
	                // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000)
	                dispatch(setBtnLoadingDisplay());
                    setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000);
                });
                Global.alert(result,{successFun:fun});
            }
        }
    }
}