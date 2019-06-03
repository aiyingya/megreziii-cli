import React, {Component} from 'react';
import img404 from './img/404.png';
import img500 from './img/500.png';
import imgUpgrade from './img/Upgrade.png';
import style from './ErrorPage.less';

const context={
    404:"出错啦！你访问的页面不存在",
    500:"很抱歉，系统出现错误！",
    Return:"请点击",
    Href:"返回首页",
    Upgrade:"系统升级通知！",
    UpgradeDetail:"我们正在对系统进行升级，暂时无法访问，敬请谅解。"
};

class ErrorPage extends Component {
    constructor(props) {
        super(props);
        let pathname = window.location.pathname;
        let state={};
        if(pathname.indexOf('404') > -1){
            state.type='404';
            state.img=img404;
            state.context=context['404'];
        } else if(pathname.indexOf('500') > -1){
            state.type='500';
            state.img=img500;
            state.context=context['500'];
        } else if(pathname.indexOf('Upgrade') > -1){
            state.type='Upgrade';
            state.img=imgUpgrade;
            state.context=context['Upgrade'];
        }
        this.state = state;
        this.getDetail = this.getDetail.bind(this);
    }

    getDetail(){
        switch (this.state.type){
            case '404':
            case '500':
                return (
                    <div className={style.detail}>
                        {context.Return}<a href='/'>{context.Href}</a>
                    </div>
                );
            case 'Upgrade':
                return (
                    <div className={style.detail}>
                        {context.UpgradeDetail}
                    </div>
                )
        }
    }

    render() {
        return (
            <div className={style.inside}>
                <img src={this.state.img } className={style.img}/>
                <div className={style.context}>{this.state.context}</div>
                {this.getDetail()}
            </div>
        );
    }
}

export default ErrorPage;