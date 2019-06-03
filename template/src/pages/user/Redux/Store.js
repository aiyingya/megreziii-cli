import { createStore, applyMiddleware } from 'redux';
import {reducer} from './Reducer';
import {loadingStart,loadingEnd,search,queryJobTitle,getFormItems,
    setSearchObj,setOrgTreeDatas,setOrgTreeChecked,showRoleEdit,
    setRoleList,
    setUserRoleList,
    setDatas,
    setUser,
    setBtnLoadingActive,setBtnLoadingDisplay,
    setBtnRequestActive,
    setBtnRequestDisplay,
    setOrgFormItems,
    setResourcePerms,
    setExpandKey
} from './Actions';
import api from "../../../api/UserApi";
import config from "../../../api/Config";
import {Global,Dict} from 'winning-megreziii-utils';
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
        user:{
            initPerms: async ()=>{
                // 查询保存在当前模块下的资源列表,isshow为1为要显示的资源
                let result = await api.UserResource({page_code:config.user.page_code});
                dispatch(setResourcePerms(result.datas));
            },
            initTable:async (_this,{value ={},page = 1,pageSize =10,isFrozenPaging = false}={}) => {
                // When：进入页面/点击查询
                dispatch(loadingStart());
                // 是否冰冻页面来初始化当前展示哪一页
                // 是否冰冻页面来初始化当前展示哪一页
                if (isFrozenPaging) {
                    page =_this.props.state.pagination.current;
                    pageSize = _this.props.state.pagination.pageSize;
                    value =_this.props.state.searchObj;
                }
                // 查询条件
                let searchObj = curUtil.getFormSearch(value,page,pageSize);
                // 查询数据
                let result = await api.UserList(searchObj);
                Global.alert(result,{
                    successFun:()=>{
                        result.onChange = (_page, _pageSize)=>{
                            // 绑定分页按钮点击事件
                            _this.props.user.initTable(_this,{value:_this.props.state.searchObj,page:_page, pageSize:_pageSize});

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
            initSearch: async (searchVal)=>{
                // 初始化表单选项
                let result = await api.Dictionary();
                if (result.status == 0) {
                    let _searchData =await Dict.getKey("ZYJSZW");
                    let forms = [
                        {labelName: '用户名称', formType: Global.SelectEnum.INPUT, name: 'yh_mc'},
                        {labelName: '职务头衔', formType: Global.SelectEnum.SELECT, name: 'zw', children: _searchData}
                    ]
                    // 写入查询初始值
                    if (searchVal) {
                        forms = Global.setFormsValue(forms,searchVal);
                    }
                    // 写入查询Form，用于显示查询组件内容
                    dispatch(getFormItems(forms));
                    // 写入职务列表在编辑页显示职务信息时使用
                    dispatch(queryJobTitle(_searchData));
                }
            },
            setOperateToDatas:(result)=>{
                // 更新Table数据
                dispatch(setDatas(result));
            },
            handleRemove: async (_this, record) => {
                //删除用户
                dispatch(loadingStart());
                let result = await api.UserRemove({yh_ids: Array.of(record.yh_id)});
                Global.alert(result,{successFun:()=>{
                    _this.props.user.initTable(_this,{isFrozenPaging:true});
                }})
                dispatch(loadingEnd());
            },
            handleEnableUser:async(_this,record)=>{
                // 启用禁用用户
                dispatch(loadingStart());
                let active = curUtil.adverseEnable(record.qyzt)+"";
                let ids = Array.of(record.yh_id);
                let param = {qyzt:active,yh_ids:[...ids]};
                let result = await api.UserRemove(param);
                Global.alert(result,{successFun:()=>{
                    _this.props.user.initTable(_this,{isFrozenPaging:true});
                }});
                dispatch(loadingEnd());
            }
        },
        userOperate:{
            unique: async (id) => {
                let result = await api.UserUnique({yh_id:id});
                Global.alert(result,{isSuccessAlert:false});
                return result.data;
            },
            handleOperate: async (record,fun) => {
	            // 新增用户 Or 更新用户
	            dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
	            let result = await api.UserUpdate(record).finally(() => {
		            // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000);
		            dispatch(setBtnLoadingDisplay());
                    setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000);
                });
                Global.alert(result,{successFun:fun});
            },
        },
        userOrganizationOperate:{
            initOrgSearch:() => {
                // 初始化结构查询条件
                let forms = [
                    {labelName: '机构名称', formType: Global.SelectEnum.INPUT, name: 'org_name'}
                ]
                // 写入查询Form，用于显示查询组件内容
                dispatch(setOrgFormItems(forms));
            },
            /**
             *
             * @param userId 用户if
             * @param value 用户的搜索条件
             * @param isInit 是否初始化访问 false为用户主动筛选查询
             * @returns {Promise<void>}
             */
            initOrgTree: async ({userId,value={},isInit=true})=> {
                // 查询用户对应机构
                dispatch(loadingStart());
                // 查询数据
                let isSearchAll = _.isEmpty(value.org_name) ? true : false;
                let searchObj ={...value,yh_id:userId};
                let result = isSearchAll ? await api.OrgList(searchObj) : await api.OrgTree(searchObj);
                Global.alert(result,{
                    successFun:()=>{
                        // 显示机构树
                        let tree = isSearchAll ? Global.changeDatasToTree({dataList:result.datas,id:'org_id',parentId:'parent_org_id'}) :result.datas;
                        result.datas = tree;

                        //默认查询全部，不展开节点
                        let expandKey =[];
                        if (!isSearchAll) {
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
                        dispatch(setOrgTreeDatas(tree));
                        if(isInit){
                            dispatch(setOrgTreeChecked(result.data.checked));
                        }
                    },
                    isSuccessAlert:false
                })
                dispatch(loadingEnd());
            },
            setChecked:(selectedRowKeys)=>{
                dispatch(setOrgTreeChecked(selectedRowKeys));
            },
            save:async (userId,orgIds,fun)=>{
                // 新增 Or 更新
	            dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
	            let result = await api.UserOrgUpdate({yh_id:userId,data_org_ids:orgIds}).finally(() => {
		            // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000);
		            dispatch(setBtnLoadingDisplay());
                    setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000);
	            });
	            Global.alert(result,{successFun:fun});
            },
            setExpandKey:(key)=>{
                dispatch(setExpandKey(key));
            },
        },
        userRole:{
            showRoleEdit:()=>{
                dispatch(showRoleEdit());
            },
            queryUserRole: async (record) => {
                dispatch(setUser(record));
                // 获取用户已有角色 和 未包含角色
                let result = {
                    dataSource: [],
                    targetKeys: []
                };
                let resultA = await api.RoleList({
                    pageIndex: 1,
                    pageSize: 999
                });
                if (resultA.status == 0) {
                    result.dataSource = resultA.datas;
                    dispatch(setRoleList(result.dataSource));
                }
                let resultB = await api.UserRoleList({yh_id:record.yh_id});
                if (resultB.status == 0) {
                    const datas = resultB.datas;
                    result.targetKeys = (datas && datas.map(item => item.js_id)) || [];
                    dispatch(setUserRoleList(result.targetKeys));
                }
                return result;
            },
            setRoleList:(values)=>{
                dispatch(setRoleList(values));
            },
            setUserRoleList:(values)=>{
                dispatch(setUserRoleList(values));
            },
            handleUserRole: async (userId, roleIds,fun) => {
                dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
                let result = await api.UserRoleUpdate({'yh_id': userId, 'js_ids': roleIds}).finally(() => {
	                // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000);
	                dispatch(setBtnLoadingDisplay());
                    setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000);
                });
                Global.alert(result,{successFun:fun});
            }
        }
    }
}