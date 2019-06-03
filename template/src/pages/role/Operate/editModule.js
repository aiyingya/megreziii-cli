import React, {Component} from 'react';
import { Table, Button, Divider} from 'antd';
import style from '../common.less'
import Columns from './columnsModule';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import {Link} from 'react-router-dom';
import curUtil from "../Util/index";
import {Global,ReduxWarpper,BasicGroupComponent,BreadcrumbCustom,Scrollbar} from 'winning-megreziii-utils';
class EditModuleFrom extends Component {
    constructor(props) {
        super(props);
        let state ={
            backUrl:'/system/role'
        }
        let query = this.props.location.query
        if (query && query.record) {
            let record = query.record;
            Object.assign(state,{
                roleId : record.js_id
            })

        }else{
            this.props.history.push(state.backUrl);
        }
        this.state ={...state}
        this.submitModule = this.submitModule.bind(this)
        this.goBack = this.goBack.bind(this)
	    this.inside = React.createRef();

    }
    goBack(){
        this.props.history.push({pathname:this.state.backUrl, query: {frozenPaging:true}})
    }
    submitModule(){
        if(!this.props.state.btnRequest) return
        this.props.roleModuleOperate.handleRoleModule(this.state.roleId,this.props.state.moduleTreeChecked,()=>{
            this.goBack()
        })
    }
    // 初始化数据
    componentWillMount(){
        this.props.roleModuleOperate.queryRoleModule(this.state.roleId)
    }

    componentDidMount(){
	    new Scrollbar(this.inside.current).show()


    }

    componentWillUnmount(){
        this.props.roleModuleOperate.destory()
    }

    render() {
        const { btnRequestLoading } = this.props.state
        let rowSelectionTree = curUtil.rowSelectionTree(this)
        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                {/*导航条*/}
                <BreadcrumbCustom first="系统管理" second="角色管理" third="分配模块" secondUrl={this.state.backUrl}/>
                <Divider />
                {/*列表*/}
                <div className={'Table40 TableMain'}>
                    <Table
                        loading={this.props.state.loading}
                        columns={Columns(this)}
                        dataSource={this.props.state.moduleTreeDatas}
                        rowSelection={rowSelectionTree}
                        pagination={ false }
                        rowKey="mk_id"
                    />
                </div>
                {/*操作按钮*/}
                {/*<BasicGroupComponent {...Global.showButtonOne({direction : Global.Direction.DOWN, text:'保存',onClick:this.submitModule})}/>*/}
                    <BasicGroupComponent {...Global.showButtonSaveSpe({
                        save:this.submitModule,
                        cancel:this.goBack,
                        saveBtnLoading:btnRequestLoading
                    })}/>
            </div>
            </div>
        )

    }
}
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,EditModuleFrom);