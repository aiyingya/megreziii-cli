import React, {Component} from 'react';
import { Table, Divider,Spin,Icon } from 'antd';
import style from '../common.less'
import Columns from './columnsModule';
import ColumnsResource from './columnsModuleResource';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import {Link} from 'react-router-dom';
import _ from "lodash";
import {Global,ReduxWarpper,BasicGroupComponent,BreadcrumbCustom,Scrollbar} from 'winning-megreziii-utils';
class EditModuleFrom extends Component {
    constructor(props) {
        super(props);
        let state ={
            backUrl:'/system/role'
        }
        let query = this.props.location.query
        if (query && query.record) {
            Object.assign(state,{
                roleId : query.record.js_id,
                selectedRowKeys:[],//默认选中的资源
                curModuleId:-1,
                modlDatas:{},
                // isSubmit:false
            })

        }else{
            this.props.history.push(state.backUrl);
        }
        this.state ={...state}
        this.submitModuleResource = this.submitModuleResource.bind(this)
        this.goBack = this.goBack.bind(this)
	    this.inside = React.createRef();

    }
    goBack(){
        this.props.history.push({pathname:this.state.backUrl, query: {frozenPaging:true}})
    }
    // 初始化数据
    componentWillMount(){
        this.props.roleModuleResource.queryModule(this.state.roleId)
    }

    //初始化页面
    componentDidMount(){
	    new Scrollbar(this.inside.current).show()
    }
    componentWillUnmount(){
        this.props.roleModuleResource.destory()
    }
    submitModuleResource(){
        if(!this.props.state.btnRequest) return
        let _modlDatas = this.state.modlDatas
        if(Object.keys(_modlDatas).length == 0){
            return
        }
        this.props.roleModuleResource.save({
            modlDatas:_modlDatas,
            roleId:this.state.roleId
        },()=>{
            this.goBack()
        })
    }

    render() {
        const { btnRequestLoading } = this.props.state
        let rowSelection = {
            selectedRowKeys: (this.state.modlDatas && this.state.modlDatas[this.state.curModuleId]) || [],
            onSelect: (record, selected, selectedRows) => {
                let modlDatas = Global.operateObjectArr({
                    obj: this.state.modlDatas,
                    key: this.state.curModuleId,
                    newArr: [record.zy_id]
                }, selected)
                this.setState({modlDatas: modlDatas})
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                let modlDatas = Global.operateObjectArr({
                    obj: this.state.modlDatas,
                    key: this.state.curModuleId,
                    newArr: _.map(changeRows, 'zy_id')
                }, selected)
                this.setState({modlDatas: modlDatas})
            },
        }
        return (
            <div className={style.body} ref={this.inside}>
                 <div className={style.content}>
                    {/*导航条*/}
                    <BreadcrumbCustom first="系统管理" second="角色管理" third="分配资源" secondUrl={this.state.backUrl}/>
                    <Divider/>
                    <div className={'TableMain'}>
                        <div className={style.editMR}>
                            {/*模块列表*/}
                            <div className={'Table40 '}>
                                <Table
                                    loading={this.props.state.loading}
                                    columns={Columns(this)}
                                    dataSource={this.props.state.moduleTreeDatas}
                                    pagination={false}
                                    rowKey="mk_id"
                                    defaultExpandAllRows={true}
                                    scroll={{y: 320}}
                                    onRow={(record) => {
                                        return {
                                            onClick: () => {
                                                //TODO: 这里数据可以存缓存切换更快
                                                let curModuleId = record.mk_id
                                                this.setState({curModuleId})

                                                this.props.roleModuleResource.queryResource({
                                                    mk_id: record.mk_id,
                                                    js_id: this.state.roleId
                                                }).then((res = []) => {
                                                    let modlDatas = this.state.modlDatas
                                                    modlDatas[curModuleId] = (_.isEmpty(modlDatas[curModuleId]) ? res : Array.from(new Set([...modlDatas[curModuleId], ...res])))
                                                    this.setState({modlDatas})
                                                })
                                            }
                                        }
                                    }}
                                />
                            </div>
                            {/*资源列表*/}
                            <div className={'Table40 ' + style.table2}>
                                <Table
                                    loading={this.props.state.loadingR}
                                    columns={ColumnsResource(this)}
                                    dataSource={this.props.state.resourceDatas}
                                    rowSelection={rowSelection}
                                    pagination={false}
                                    rowKey="zy_id"
                                    scroll={{y: 320}}
                                />
                            </div>
                        </div>
                        {/*操作按钮*/}
                        <BasicGroupComponent {...Global.showButtonSaveSpe({
                            save:this.submitModuleResource,
                            cancel:this.goBack,
                            saveBtnLoading:btnRequestLoading
                        })}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,EditModuleFrom);