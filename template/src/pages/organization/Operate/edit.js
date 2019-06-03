import React, {Component} from 'react';
import style from '../common.less'
import {ReduxWarpper, BreadcrumbCustom, Scrollbar, Global} from 'winning-megreziii-utils';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import { Form, Input, Button, Row,Col,Divider,Select,TreeSelect } from 'antd';
import {withRouter} from 'react-router-dom';
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    },
};

class EditFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'新增机构',
            backUrl:'/system/organization',
            record:{}
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this)
	    this.inside = React.createRef();

    }
    goBack(){
        this.props.history.push({pathname:this.state.backUrl, query: {frozenPaging:true}})
    }
    handleSubmit(e){
        e.preventDefault();
        if(!this.props.state.btnRequest) return
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let val = {...this.state.record,...values}
                this.props.organizationOperate.handleOperate(val,()=>{
                    this.goBack()
                })
            }
        });
    }
    componentWillMount(){
        let query = this.props.location.query
        if (query && query.record && query.record.org_id) {
            let record = query.record;
            /*this.props.organizationOperate.initUnique(record.id).then(res=>{
                this.props.organizationOperate.initParentMenus(res.parent_org_name)
            })*/
            this.setState({record:{...record},text:'编辑机构'})
        }
        this.props.organizationOperate.initMenus()
    }
    componentDidMount(){
	    new Scrollbar(this.inside.current).show()


    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const { btnRequestLoading,allList } = this.props.state
        const { record } = this.state
        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                <BreadcrumbCustom first="系统管理" second="系统组织" third={this.state.text} secondUrl={this.state.backUrl}/>
                <Divider />
                <Form onSubmit={this.handleSubmit} className={style.form}>
                    <Form.Item {...formItemLayout} label="机构代码">
                        {getFieldDecorator('org_id', {
                            initialValue: record.org_id,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder={record.id ? '' : "请输入"} maxLength={15} disabled={record.id ? true : false}  />
                        )}

                    </Form.Item>
                    <Form.Item {...formItemLayout} label="机构名称">
                        {getFieldDecorator('org_name', {
                            initialValue: record.org_name,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" maxLength={50}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="上级机构">
                        {getFieldDecorator('parent_org_id', {
                            initialValue: (record.parent_org_id == 0 | !record.parent_org_id) ? Global.TopMenuValue : record.parent_org_id
                        })(
                            <TreeSelect
                                dropdownStyle={{ maxHeight: 230, overflow: 'auto' }}
                                treeData={allList}
                                placeholder="无"
                                treeDefaultExpandAll={false}
                                showSearch ={true}
                                treeNodeFilterProp="title"
                                treeDefaultExpandedKeys = {[0]}
                            />
                        )}
                    </Form.Item>
                    {/*<Form.Item {...formItemLayout} label="上级机构">
                        {getFieldDecorator('parent_org_id', {
                            initialValue: record.parent_org_id
                        })(
                            <Select>
                                {parentList && parentList.map(item =>
                                    <Select.Option  key={item.value}>{item.name}</Select.Option>
                                )}
                            </Select>
                        )}
                    </Form.Item>*/}
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('memo', {
                            initialValue:record.memo,
                            rules: [{ message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" maxLength={250}/>
                        )}
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={5}/>
                        <Col span={12} className={style.formBtn}>
                            <Button type="main" htmlType="submit" loading={btnRequestLoading}>保存</Button>
                            <Button type="secondary" onClick={this.goBack}>取消</Button>
                        </Col>
                    </Row>
                </Form>
                </div>
            </div>
        );
    }
}
EditFrom = Form.create({ name: 'OrganizationOperate' })(EditFrom);
export default  ReduxWarpper(mapStateToProps, mapDispatchToProps,store,EditFrom);