import React, {Component} from 'react';
import style from '../common.less'
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import { Form, Input, Button, Row,Col,Divider,Select } from 'antd';
import {withRouter} from 'react-router-dom';
import {Global,ReduxWarpper,BreadcrumbCustom,Scrollbar} from 'winning-megreziii-utils';
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
            text: '新增用户',
            backUrl:'/system/user',
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
                this.props.userOperate.handleOperate(val,()=>{
                    this.goBack()
                })
            }
        });
    }

    componentWillMount(){
        let query = this.props.location.query
        if (query && query.record && query.record.yh_id) {
           this.props.userOperate.unique(query.record.yh_id).then(record=>{
               this.setState({record:{...record},text:'编辑用户'})
           })
        }
    }
    componentDidMount(){
	    new Scrollbar(this.inside.current).show()
    }
    render() {
        const {getFieldDecorator,getFieldValue} = this.props.form;
        const { jobTitle,btnRequestLoading } = this.props.state
        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                <BreadcrumbCustom first="系统管理" second="用户管理" third={this.state.text} secondUrl={this.state.backUrl}/>
                <Divider />
                <Form onSubmit={this.handleSubmit} className={style.form} autocomplete="off">

                    <Form.Item {...formItemLayout} label="用户名">
                        {getFieldDecorator('yh_mc', {
                            initialValue: this.state.record.yh_mc,
                            rules: [{required: true,  message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" maxLength={50} />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="用户密码">
                        {getFieldDecorator('yh_mm', {
                            initialValue: this.state.record.yh_mm,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" maxLength={8}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="姓名">
                        {getFieldDecorator('xm', {
                            initialValue: this.state.record.xm,
                            rules: [{
                                required: true,
                                message: '请输入',
                            }],
                        })(
                            <Input placeholder="请输入" maxLength={50}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="职务头衔">
                        {   getFieldDecorator('zw', {
                            initialValue: this.state.record.zw,
                            rules: [{
                                message: '无',
                            }],
                             })(
                            <Select>
                                {jobTitle && jobTitle.map(item =>
                                    <Select.Option  key={item.value}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="拼音">
                        {getFieldDecorator('py', {
                            initialValue: this.state.record.py,
                        })(
                            <Input placeholder="请输入" maxLength={50}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="联系电话">
                        {getFieldDecorator('dh', {
                            initialValue: this.state.record.dh,
                            rules: [{
                                pattern:/((\d{2,5}-)?\d{7,8}(-\d{1,})?)|(^\d{11}$)/,
                                message: '请输入正确的电话号码',
                            }],
                        })(
                            <Input placeholder="请输入"/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="EMAIL(邮箱)">
                        {getFieldDecorator('yx', {
                            initialValue: this.state.record.yx,
                            rules: [{
                                type: 'email',
                                message: '请输入正确的邮箱',
                            }],
                        })(
                            <Input placeholder="请输入" maxLength={100}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('bz', {
                            initialValue: this.state.record.bz,
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
        )
    }
}
EditFrom = Form.create({ name: 'UserOperate' })(EditFrom);
export default  ReduxWarpper(mapStateToProps, mapDispatchToProps,store,EditFrom);