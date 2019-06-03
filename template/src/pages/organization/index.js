import React, {Component} from 'react';
import { Table, Button, Divider} from 'antd';
import style from './common.less'
import Columns from './columns';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import {Link} from 'react-router-dom';
import {Global,ReduxWarpper,BasicFormComponent, BasicGroupComponent,Scrollbar} from 'winning-megreziii-utils';

class Organization extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.goEdit = this.goEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleOnExpand = this.handleOnExpand.bind(this);
	    this.inside = React.createRef();

    }
    goEdit(record){
        this.props.history.push({
            pathname: '/system/organization/operate',
            query: {
                record: record
            }
        })
    }

    handleSearch(value){
        this.props.organization.initTable(this, {value});
    }
    handleOnExpand(expanded, record){
        let _keys = this.props.state.expandKey;
        if (expanded) {
            _keys.push(record["org_id"]+"")
        }else {
            _.pullAllBy(_keys, [record["org_id"]])
        }
        this.props.organization.setExpandKey(_keys)
    }

    componentWillMount(){
        let isFrozenPaging = this.props.location.query ? this.props.location.query.frozenPaging : false;
        this.props.organization.initTable(this,{isFrozenPaging});
        isFrozenPaging ? this.props.organization.initSearch(this.props.state.searchObj) : this.props.organization.initSearch();

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
                        loading={this.props.state.loading}
                        columns={ Columns(this)}
                        dataSource={this.props.state.datas}
                        rowKey="org_id"
                        expandedRowKeys={this.props.state.expandKey}
                        onExpand={this.handleOnExpand}
                        pagination={ false }
                        onRow={(record)=>{
                            return {
                                onMouseEnter: (event)=> {
                                    this.props.organization.setOperateToDatas(Global.changeTreeDatasById({data:this.props.state.datas,record,id:"org_id"}))
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
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,Organization);