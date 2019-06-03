import React, {Component} from 'react';
import { Table, Divider} from 'antd';
import style from './common.less'
import Columns from './columns';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import EditRoleModal from './Operate/editRoleModal';
import {Global,Utils,ReduxWarpper,BasicFormComponent, BasicGroupComponent,AuthComponent,Scrollbar} from 'winning-megreziii-utils';
class User extends Component {
    constructor(props) {
        super(props);
        this.goEdit = this.goEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.inside = React.createRef();
    }
    goEdit(record){
        this.props.history.push({
            pathname: '/system/user/operate',
            query: {
                record: record
            }
        })
    }
    goEditRole(record){
        this.props.userRole.queryUserRole(record).then(()=>{
            this.props.userRole.showRoleEdit();
        })
    }
    goEditOrg(record){
        this.props.history.push({
            pathname: '/system/user/editOrganization',
            query: {
                record: record
            }
        })
    }
    handleSearch(value){
        this.props.user.initTable(this,{value});
    }

    componentWillMount(){
       /* console.log(less)
        less.modifyVars({
            "@background-color": "black"
        });*/
        this.props.user.initPerms();
        let isFrozenPaging = this.props.location.query ? this.props.location.query.frozenPaging : false;
        this.props.user.initTable(this,{isFrozenPaging});
        isFrozenPaging ? this.props.user.initSearch(this.props.state.searchObj) : this.props.user.initSearch();
    }

    componentDidMount(){
	    new Scrollbar(this.inside.current).show()
    }

    render() {
        const Auth = AuthComponent(Table);
        return (
	        <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                    {/*搜索条件*/}
                    <BasicFormComponent forms={this.props.state.formItems} handleSearch={this.handleSearch} />

                    <Divider />
                    {/*列表*/}
                    <div className={'Table40 TableMain'}>
                        {/*操作按钮*/}
                        <BasicGroupComponent {...Global.showButtonOne({text:'新增', onClick:this.goEdit,auth:'add'})}/>
                       {/* TODO: 注意这里有个权限展示*/}
                        <Auth auth="userlist"
                              perms={this.props.state.resourcePerms}
                            loading={this.props.state.loading}
                            columns={ Columns(this)}
                            dataSource={this.props.state.datas}
                            pagination={this.props.state.pagination}
                            rowKey="yh_id"
                            onRow={(record)=>{
                                return {
                                    onMouseEnter: (event)=> {
                                        this.props.user.setOperateToDatas(Global.changeDatasById({data:this.props.state.datas,record,id:"yh_id"}))
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                {this.props.state.editRoleModal && <EditRoleModal/>}
            </div>

        )

    }
}
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,User);