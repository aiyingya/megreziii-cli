import { createStore, applyMiddleware } from 'redux';
import {reducer} from './Reducer';
import {loadingStart,loadingEnd,search,queryRoleType,getFormItems,searchModule,
    searchModuleChecked,
    setSearchObj,
    setDatas,
    setResourceDatas,
    setBtnRequestActive,
    setBtnRequestDisplay,
    setBtnLoadingActive,setBtnLoadingDisplay,
    setResourcePerms,
    loadingStartR,
    loadingEndR
} from './Actions';
import api from "../../../api/RoleApi";
import {message} from "antd/lib/index";
import {Global} from 'winning-megreziii-utils';
import curUtil  from '../Util';
import _ from "lodash";
import config from "../../../api/Config";
export const store = createStore(reducer);

export const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    };
}

export const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        role:{
            initPerms: async ()=>{
                // 查询保存在当前模块下的资源列表,isshow为1为要显示的资源
                let result = await api.UserResource({page_code:config.role.page_code});
                dispatch(setResourcePerms(result.datas));
            },
            initTable:async (_this,{value ={},page = 1,pageSize =10,isFrozenPaging = false}={}) => {
                // 初始化表单选项
                dispatch(loadingStart());
                //console.log("是否冰冻页面：",isFrozenPaging)
                // 是否冰冻页面来初始化当前展示哪一页
                if (isFrozenPaging) {
                    page =_this.props.state.pagination.current;
                    pageSize = _this.props.state.pagination.pageSize;
                    value =_this.props.state.searchObj;
                }
                let searchObj = curUtil.getFormSearch(value,page,pageSize);
                let result = await api.RoleList(searchObj);
                if (result.status == 0) {
                    result.onChange = (_page, _pageSize)=>{
                        _this.props.role.initTable(_this,{value:_this.props.state.searchObj,page:_page, pageSize:_pageSize});
                    }
                    // 写入查询Form，用于显示查询组件内容
                    dispatch(setSearchObj(searchObj));
                    // 写入职务列表在编辑页显示职务信息时使用
                    dispatch(search(result));
                } else {
                    message.error(result.msgContent && result.msgDetail);
                }
                dispatch(loadingEnd());
                return result;
            },
            initSearch: async (searchVal)=>{
                // 初始化表单选项
                let result = await api.Dictionary();
                if(result.status==0) {
                    // 查询角色类型
                    let _searchData = result.dicts.JSLX;
                    let forms = [
                        {labelName:'角色名称',formType:Global.SelectEnum.INPUT,name:'js_mc'},
                        {labelName:'角色类型',formType:Global.SelectEnum.SELECT,name:'js_lx',children: _searchData}
                    ]
                    // 写入查询初始值
                    if (searchVal) {
                        forms = Global.setFormsValue(forms,searchVal);
                    }
                    dispatch(getFormItems(forms));
                    // 在初始化表单中，已获取角色类型列表 就顺便保存角色类型到state
                    dispatch(queryRoleType(_searchData));
                }
            },
            setOperateToDatas:(result)=>{
                dispatch(setDatas(result));
            },
            handleRemove:async (_this,record)=>{
                //删除
                dispatch(loadingStart());
                let result = await api.RoleRemove({js_ids:Array.of(record.js_id)});
                Global.alert(result,{successFun: () =>{
                        _this.props.role.initTable(_this,{isFrozenPaging:true});
                    }})
                dispatch(loadingEnd());
            },
        },
        roleOperate:{
            handleOperate:async (record,fun)=>{
                // 新增 Or 更新
                dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
                let result = await api.RoleUpdate(record).finally(() => {
	                // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000);
	                dispatch(setBtnLoadingDisplay());
                    setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000);
                });
                Global.alert(result,{successFun:fun});
            },
        },
        roleModuleOperate:{
            queryRoleModule:async (roleId)=>{
                // 查询角色对应模块列表
                let _returndate = ''
                dispatch(loadingStart());
                let result = await api.ModuleList({'js_id':roleId});
                Global.alert(result,{
                    successFun:()=>{
                        // 显示模块树
                        let tree = Global.changeDatasToTree({dataList:result.datas,id:'mk_id',parentId:'sj_mk_id'})
                        dispatch(searchModule(tree))
                        result = result.data.checked
                        _returndate = result
                        dispatch(searchModuleChecked(result))
                    },
                    isSuccessAlert:false
                })
                dispatch(loadingEnd());
                return _returndate
            },
            setChecked:(selectedRowKeys)=>{
                dispatch(searchModuleChecked(selectedRowKeys))
            },
            handleRoleModule:async (roleId,moduleIds,fun)=>{
                dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
                let result = await api.AllotRoleModule({'js_id':roleId,'mk_ids':moduleIds}).finally(() => {
	                // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000)
	                dispatch(setBtnLoadingDisplay())
                    setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000)
                });
                Global.alert(result,{successFun:fun})
            },
            destory:()=>{
                dispatch(searchModuleChecked([]))
            }
        },
        roleModuleResource:{
            queryModule: async (roleId)=>{
                // 查询角色已有模块列表
                dispatch(loadingStart());
                let result = await api.HasRoleModule({'js_id':roleId});

                Global.alert(result,{
                    successFun:()=>{
                        let tree = Global.changeDatasToTree({dataList:result.datas,id:'mk_id',parentId:'sj_mk_id'})
                        // let tree = curUtil.exportModuleTree(result.datas)
                        dispatch(searchModule(tree))
                    },
                    isSuccessAlert:false
                })

                dispatch(loadingEnd());
            },
            queryResource: async ({mk_id,js_id})=>{
                // 查询模块下的资源
                dispatch(loadingStartR());
                setResourceDatas(null)
                let result = await api.RoleModuleResourceList({mk_id,js_id});
                Global.alert(result,{
                    successFun:()=>{dispatch(setResourceDatas(result.datas))},
                    isSuccessAlert:false
                })
                dispatch(loadingEndR());
                return result && result.data && result.data.checked
            },
            /*save1: ({modlDatas,roleId},fun)=>{
                // 旧版本接口调用， 接口方仅支持对一个模块的更新，所以这里循环调用更新，使用 count计数
                let count = Object.keys(modlDatas).length
                let errMsg = []
		            // 新增 Or 更新
                dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
                _.forIn(modlDatas, (values, key)=>{
                    api.SaveModuleResourceAsync({
                        js_id:roleId,
                        mk_id:key,
                        zy_ids:values
                    }).then( result=>{
                        --count  //计数
                        if(count == 0 ){
                            errMsg.length ==0 ?  Global.alert(result,{successFun:fun}) :  Global.alertError(`模块[${errMsg.join()}]更新失败，请联系管理员`)
                        }
                        else if (result.status != 0) {
                            errMsg.push(key)
                        }
                    }).finally(() => {
	                    if(count == 0 ){
                            // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000)
		                    dispatch(setBtnLoadingDisplay())
                            setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000)
	                    }
                    });
                })
            },*/
            save:async ({modlDatas,roleId},fun)=>{
                // 新接口改为支持一次性对多个模块更新

                // 新增 Or 更新
                dispatch(setBtnLoadingActive());
                dispatch(setBtnRequestDisplay());
                let _list =[]
                Object.keys(modlDatas).forEach((key, index)=>{
                    let mol = {
                        mk_id:Number(key),
                        zy_ids:modlDatas[key]
                    }
                    _list.push(mol)
                })
                let postValue={
                    js_id: roleId,
                    list:_list
                }
                postValue = JSON.stringify(postValue)
                console.log(postValue)
                let result = await api.SaveModuleResource({jsMkZyId:postValue}).finally(() => {
                    // setTimeout(()=>{dispatch(setBtnLoadingDisplay())},Global.AlertTime*1000)
                    dispatch(setBtnLoadingDisplay())
                    setTimeout(()=>{dispatch(setBtnRequestActive())},Global.AlertTime*1000)
                });
                Global.alert(result,{successFun:fun})
            },
            destory:()=>{
                dispatch(setResourceDatas(null))
            }
        }
    }
}