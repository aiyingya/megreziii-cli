import React, {Component} from 'react';
import style from '../common.less'
import {ReduxWarpper,BreadcrumbCustom,Scrollbar} from 'winning-megreziii-utils';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import { Form, Input, Button, Row,Col,Divider,Select } from 'antd';
import {Link} from 'react-router-dom';

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
            text: '新增角色',
            backUrl:'/system/role',
            record:{}
        };
        this.changeInputValue=this.changeInputValue.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.goBack=this.goBack.bind(this);
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
                this.props.roleOperate.handleOperate(val,()=>{
                    this.goBack()
                })
            }
        });
    }

    changeInputValue(e){
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount(){
        let query = this.props.location.query
        if (query && query.record && query.record.js_id) {
            let record = query.record;
            this.setState({record:{...record},text:'编辑角色'})
        }
	    new Scrollbar(this.inside.current).show()


    }

    render() {
        const {getFieldDecorator,getFieldValue} = this.props.form;
        const { roleType,btnRequestLoading } = this.props.state
        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                <BreadcrumbCustom first="系统管理" second="角色管理" third={this.state.text} secondUrl={this.state.backUrl}/>
                <Divider />
                <Form onSubmit={this.handleSubmit} className={style.form}>
                    <Form.Item {...formItemLayout} label="角色名称">
                        {getFieldDecorator('js_mc', {
                            initialValue: this.state.record.js_mc,
                            rules: [{
                                required: true,
                                message: '请输入',
                                whitespace: true
                            }],
                        })(
                            <Input placeholder="请输入" name="yh_mc"  maxLength={50} onChange={this.changeInputValue}/>
                        )}

                    </Form.Item>

                    <Form.Item {...formItemLayout} label="角色类型">
                        {   getFieldDecorator('js_lx', {
                            initialValue: this.state.record.js_lx,
                            rules: [{
                                required: true,
                                message: '请输入'
                            }],
                             })(
                            <Select>
                                {roleType && roleType.map(item =>
                                    <Select.Option  key={item.value}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('bz', {
                            initialValue: this.state.record.bz,
                        })(
                            <Input placeholder="请输入" name="bz"  maxLength={200} onChange={this.changeInputValue}/>
                        )}
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={5}/>
                        <Col span={12} className={style.formBtn}>
                            <Button type="main" htmlType="submit" loading={btnRequestLoading}>保存</Button>
                            <Button type="secondary" onClick={this.goBack}>取消</Button>
                        </Col>
                        <Col span={6}/>
                    </Row>
                </Form>
            </div>
            </div>
        );
    }
}
EditFrom = Form.create({ name: 'RoleOperate' })(EditFrom);
export default  ReduxWarpper(mapStateToProps, mapDispatchToProps,store,EditFrom);