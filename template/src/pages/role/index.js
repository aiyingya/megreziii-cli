import React, {Component} from 'react';
import { Table, Divider} from 'antd';
import style from './common.less'
import Columns from './columns';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import {withRouter} from 'react-router-dom';
import {Global,ReduxWarpper,BasicFormComponent, BasicGroupComponent,Scrollbar} from 'winning-megreziii-utils';
class Role extends Component {
    constructor(props) {
        super(props);
        this.state ={}
        this.goEdit = this.goEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
	    this.inside = React.createRef();

    }
    // 跳转至新增Or编辑页面
    goEdit(record){
        this.props.history.push({
            pathname: '/system/role/operate',
            query: {
                record: record
            }
        })
    }

    // 跳转至新增Or编辑模块页面
    goEditModule(record){
        this.props.history.push({
            pathname: '/system/role/operateModule',
            query: {
                record: record
            }
        })
    }

    // 跳转至分配模块资源页
    goEditModuleResource(record){
        this.props.history.push({
            pathname: '/system/role/operateModuleResource',
            query: {
                record: record
            }
        })
    }

    handleSearch(value){
        this.props.role.initTable(this, {value});
    }

    //初始化数据
    componentWillMount(){
        // this.props.role.initPerms()
        let isFrozenPaging = this.props.location.query ? this.props.location.query.frozenPaging : false;
        this.props.role.initTable(this,{isFrozenPaging});
        isFrozenPaging ? this.props.role.initSearch(this.props.state.searchObj) : this.props.role.initSearch();
    }

    componentDidMount(){
	    new Scrollbar(this.inside.current).show()
    }

    render() {
        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
				{/*搜索条件*/}
                <BasicFormComponent forms={this.props.state.formItems} handleSearch={this.handleSearch} />
                <Divider />
                {/*列表*/}
                    <div className={'Table40 TableMain'}>
                    {/*操作按钮*/}
                    <BasicGroupComponent {...Global.showButtonOne({text:'新增', onClick:this.goEdit})}/>
                    <Table
                        className={style.table}
                        loading={this.props.state.loading}
                        columns={Columns(this)}
                        dataSource={this.props.state.datas}
                        pagination={this.props.state.pagination}
                        rowKey="js_id"
                        onRow={(record)=>{
                            return {
                                onMouseEnter: (event)=>{
                                    this.props.role.setOperateToDatas(Global.changeDatasById({data:this.props.state.datas,record,id:"js_id"}))
                                }
                            }
                        }}
                    />
                </div>
                </div>
            </div>
        )

    }
}
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,Role);