import React, {Component} from 'react';
import style from './css/License.less';
import {Uc} from 'winning-megreziii-utils';
import { Icon } from 'antd';
import {Global} from 'winning-megreziii-utils';

class License extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client_name: '',
            mac_id: '',
            expiry_date: '',
            license_source: '',
            isEdit: false,
            isWrite: true
        };
        this.loadData();
    }

    async loadData() {
        let license_view = await Uc.post('license_view');
        Global.alert(license_view,{isSuccessAlert:false})
        this.setState({
            client_name: license_view.data.client_name,
            mac_id: license_view.data.mac_id,
            expiry_date: license_view.data.expiry_date,
            license_source: license_view.data.license_source
        })
    }

    changeEdit() {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    async edit() {
        if (this.state.isWrite) {
            let license_edit = await Uc.post('license_edit', {
                "client_name": this.state.client_name,
                "license_changed": this.state.license_source
            });
            Global.alert(license_edit)
            this.changeEdit();
        }
    }

    back() {
        window.history.back();
    }

    stateChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        }, () => {
            if (!this.state.client_name || !this.state.license_source) {
                this.setState({
                    isWrite: false
                })
            } else {
                this.setState({
                    isWrite: true
                })
            }
        })
    }


    render() {
        return (
            <div className={style.license_out}>
            <div className={style.license_text_out} onChange={(e) => this.stateChange(e)}>
                <div className={style.license_logo}>
                    <div className={style.license_logo_new}></div>
                    <div className={style.license_logo_line}></div>
                </div>
                <div className={style.license_props}>
                    <div className={style.license_text_m_sqzx}>
                        <label className={style.license_text_label}>授权中心：</label>
                        <input className={style.license_text_inner_input} type="text" name="client_name"
                               value={this.state.client_name}/>
                    </div>
                    <div className={style.license_text_m}>
                        <label className={style.license_text_label}>序列号：</label>
                        <label className={style.license_text_inner}>{this.state.mac_id}</label>
                    </div>
                    <div className={style.license_text_m_yxq}>
                        <label className={style.license_text_label}>有效期：</label>
                        <label
                            className={style.license_text_inner_yxq}>{this.state.expiry_date}</label>
                    </div>
                    <div className={style.license_text_m_license}>
                        <label className={style.license_text_label}>license:</label>
                        <div className={style.license_edit_icon} onClick={(e) => this.changeEdit()}>
                            <Icon type="edit" className={!this.state.isEdit ? style.license_edit_button : style.hidden}/>
                        </div>
                        <div className={style.license_edit_icon} onClick={(e) => this.edit()}>
                            <Icon type="check" className={this.state.isEdit ? style.license_check_button : style.hidden}/>
                        </div>
                        <div className={style.license_edit_icon} onClick={(e) => this.changeEdit()}>
                            <Icon type="close" className={this.state.isEdit ? style.license_remove_button : style.hidden}/>
                        </div>
                        <label className={this.state.isWrite ? style.hidden : 'license_error'}>
                            授权中心与license必须填写
                        </label>
                        <textarea
                            className={this.state.isEdit ? style.license_can_edit : style.license_cant_edit}
                            max-length="200" name="license_source" readOnly={!this.state.isEdit}
                            value={this.state.license_source}></textarea>
                    </div>
                </div>
                <div className={style.license_logo_bottom}>
                    <div>
                        <div className={style.license_query}>如何获取License?</div>
                        <div className={style.license_line}></div>
                        <div className={style.license_tel}>请联系项目经理或拨打021-26018329获取License</div>
                    </div>
                </div>

                <div className={style.license_return} onClick={(e) => this.back()}>
                    <Icon type="rollback" />
                    {/*<i className="fa fa-reply"></i>*/}
                    返回</div>
            </div>
            </div>
        )
    }
}

export default License;