import React, {Component} from 'react';
import style from '../common.less'
import {ReduxWarpper,BreadcrumbCustom,Scrollbar} from 'winning-megreziii-utils';
import {store, mapStateToProps, mapDispatchToProps} from '../Redux/Store';
import { Form, Input, Button, Row,Col,Divider,Select } from 'antd';
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
            text:'新增字典',
            backUrl:'/system/dict',
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
                this.props.dictOperate.handleOperate(val,()=>{
                    this.goBack()
                })
            }
        });
    }
    componentWillMount(){
        let query = this.props.location.query
        if (query && query.record && query.record.zd_id) {
            // this.setState({record:{...query.record},text:'编辑字典'}) 同下（字段zd_lx->ad_ls）
            this.props.dictOperate.unique(query.record.zd_id).then(record=>{
                this.setState({record:{...record},text:'编辑字典'})
            })
        }
    }
    componentDidMount(){
	      new Scrollbar(this.inside.current).show()
    }

    render() {
        const { btnRequestLoading } = this.props.state
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={style.body} ref={this.inside}>
                <div className={style.content}>
                <BreadcrumbCustom first="系统管理" second="字典管理" third={this.state.text} secondUrl={this.state.backUrl}/>
                <Divider />
                <Form onSubmit={this.handleSubmit} className={style.form}>
                    <Form.Item {...formItemLayout} label="字典类型">
                        {getFieldDecorator('zd_lx', {
                            initialValue: this.state.record.zd_lx,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder={this.state.record.zd_id ? '' : "请输入"} maxLength={50} disabled={this.state.record.zd_id ? true : false}  />
                        )}

                    </Form.Item>
                    <Form.Item {...formItemLayout} label="字典类型名称">
                        {getFieldDecorator('zd_lx_mc', {
                            initialValue: this.state.record.zd_lx_mc,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" maxLength={50}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="字典顺序">
                        {getFieldDecorator('zd_sx', {
                            initialValue: this.state.record.zd_sx,
                            rules: [{
                                pattern:/^\d{0,5}$/,
                                required: true,
                                type: 'number',
                                message: '请输入正确值',
                                whitespace: true,
                                transform:(value)=> {return Number(value)}
                            }],
                        })(
                            <Input type="number" placeholder="请输入" maxLength={5}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="字典名称">
                        {getFieldDecorator('zd_mc', {
                            initialValue:this.state.record.zd_mc,
                            rules: [{required: true, message: '请输入', whitespace: true}],
                        })(
                            <Input placeholder="请输入" maxLength={200}/>
                        )}
                    </Form.Item>


                    <Form.Item {...formItemLayout} label="字典值" >
                        {
                            getFieldDecorator('zd_z', {
                                initialValue: this.state.record.zd_z,
                                rules: [{
                                    required: true, message: '请输入', whitespace: true}],
                            })(
                                <Input placeholder="请输入" maxLength={20}/>
                            )
                        }
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
EditFrom = Form.create({ name: 'DictOperate' })(EditFrom);
export default  ReduxWarpper(mapStateToProps, mapDispatchToProps,store,EditFrom);