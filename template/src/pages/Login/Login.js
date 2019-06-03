import React, {Component} from 'react';
import { Button, Form, Input, Icon ,Spin} from 'antd';
import style from './Login.less'
import logo from './img/logo.png'
import {serviceWorker,Uc,Dict} from 'winning-megreziii-utils';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus:0,
            warningInfo:null,
            loading:false,
            username:"",
            password:null
        };
        this.handelSubmit = this.handelSubmit.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.changePwd = this.changePwd.bind(this);
    }

    async handelSubmit (e){
        e.preventDefault();
        this.setState({
            loading:true
        });
        let result = await Uc.Login({yh_mc:this.state.username,yh_mm:this.state.password});
        if(result.status==1){
            this.setState({
                loginStatus:result.status,
                warningInfo:result.msgContent || result.msgDetail,
                loading:false
            })
        }else{
            window.location.href="/index.html";
        }
    }
    changeUser (e) {
        this.setState({
            username:e.target.value,
            warningInfo:null
        })
    }
    changePwd (e) {
        this.setState({
            password: e.target.value,
            warningInfo:null
        })
    }
    render() {
         let loading=(
            <Icon type="loading" spin className={style.loadingIcon} />
        );
        return (
            <div className={style.container}>
                <div className={style.coverbg}></div>
                    {!this.state.loading && <div className={style.body}> <div className={style.logo}>
                        <img  src={logo}/>
                        <p>核心知识库引擎系统</p>
                    </div>
                    <Form className={style.form} onSubmit={this.handelSubmit}>
                        <Form.Item >
                        <Input placeholder="用户名" className={style.formItem} onChange={this.changeUser}/>
                        </Form.Item>
                        <Form.Item className={style.itemMargin} >
                        <Input type="password" placeholder="密码" className={style.formItem}  onChange={this.changePwd} />
                        </Form.Item>
                        <Form.Item className={style.itemMargin}>
                        <p className={style.warning}>{this.state.warningInfo}</p>
                        <Button type="primary" className={style.subBtn} htmlType="submit" >登录</Button>
                        </Form.Item>
                        </Form>
                        <p className={style.message}>上海金仕达卫宁软件科技有限公司版权所有</p></div>}
                    {this.state.loading && <div className={style.loadingContain}><Spin size="large" indicator={loading} className={style.loadingIcon} /><p className={style.loadingText}>登录中...</p></div>}
                </div>
        );
    }
}

export default Login;