import React, {Component} from 'react';
import { Table, Button, Divider} from 'antd';
import style from '../common.less'
import Columns from './columnsOrganization';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import {Link} from 'react-router-dom';
import curUtil from "../Util";
import {Global,ReduxWarpper,BasicFormComponent, BasicGroupComponent,BreadcrumbCustom,Scrollbar} from 'winning-megreziii-utils';
class EditOrganization extends Component {
    constructor(props) {
        super(props);
        let state ={
            backUrl:'/system/user'
        }
        let query = this.props.location.query
        if (query && query.record) {
            let record = query.record;
            state.userId = record.yh_id
        }else{
            this.props.history.push(state.backUrl);
        }
        this.state ={...state}
        this.submit = this.submit.bind(this)
        this.goBack = this.goBack.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleOnExpand = this.handleOnExpand.bind(this)
	    this.inside = React.createRef();

    }
    goBack(){
        this.props.history.push({pathname:this.state.backUrl, query: {frozenPaging:true}})
    }

    submit(){
        if(!this.props.state.btnRequest) return
        this.props.userOrganizationOperate.save(this.state.userId,
          this.props.state.orgTreeCheckedKeys,()=>{
            this.goBack()
        })

    }

    // 初始化数据
    componentWillMount(){
        this.props.userOrganizationOperate.initOrgSearch()
        this.props.userOrganizationOperate.initOrgTree({userId:this.state.userId})
    }

    componentDidMount(){
	    new Scrollbar(this.inside.current).show()
    }
    handleOnExpand(expanded, record){
        let _keys = this.props.state.expandKey;
        if (expanded) {
            _keys.push(record["org_id"]+"")
        }else {
            _.pullAllBy(_keys, [record["org_id"]])
        }
        this.props.userOrganizationOperate.setExpandKey(_keys)
    }
    handleSearch(value){
        this.props.userOrganizationOperate.initOrgTree({userId:this.state.userId,value:value,isInit:false})
    }

    render() {
        const { btnRequestLoading,orgFormItems,loading,orgTreeDatas } = this.props.state
        let rowSelectionTree = curUtil.rowSelectionTree(this)
        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                    {/*搜索条件*/}
                    <BasicFormComponent forms={orgFormItems} handleSearch={this.handleSearch} />
                    <Divider />
                    {/*导航条*/}
                    <BreadcrumbCustom first="系统管理" second="用户组织" third="分配机构" secondUrl={this.state.backUrl}/>
                    <Divider />
                    {/*列表*/}
                    <div className={'Table40 TableMain'}>
                        <Table
                            loading={loading}
                            columns={Columns(this)}
                            dataSource={orgTreeDatas}
                            rowSelection={ rowSelectionTree }
                            expandedRowKeys={this.props.state.expandKey}
                            onExpand={this.handleOnExpand}
                            pagination={ false }
                            rowKey="org_id"
                        />
                    </div>
                    {/*操作按钮*/}
                    <BasicGroupComponent {...Global.showButtonSaveSpe({
                        save:this.submit,
                        cancel:this.goBack,
                        saveBtnLoading:btnRequestLoading
                    })}/>
                </div>
            </div>
        )
    }
}
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,EditOrganization);