import React, {Component} from 'react';
import { Table, Button, Divider} from 'antd';
import style from './common.less'
import Columns from './columns';
import {store, mapStateToProps, mapDispatchToProps} from './Redux/Store';
import {Global,ReduxWarpper,BasicFormComponent, BasicGroupComponent,Scrollbar} from 'winning-megreziii-utils';
class Module extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.goEdit = this.goEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
	    this.inside = React.createRef();

    }
    goEdit(record){
        this.props.history.push({
            pathname: '/system/module/operate',
            query: {
                record: record
            }
        })
    }

    handleSearch(value){
        this.props.module.initTable(this, {value});
    }

    componentWillMount(){
        let isFrozenPaging = this.props.location.query ? this.props.location.query.frozenPaging : false;
        this.props.module.initTable(this,{isFrozenPaging});
        isFrozenPaging ? this.props.module.initSearch(this.props.state.searchObj) : this.props.module.initSearch();

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
                        rowKey="mk_id"
                        pagination={this.props.state.pagination}
                        onRow={(record)=>{
                            return {
                                onMouseEnter: (event)=> {
                                    this.props.module.setOperateToDatas(Global.changeDatasById({data:this.props.state.datas,record,id:"mk_id"}))
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
export default ReduxWarpper(mapStateToProps, mapDispatchToProps,store,Module);