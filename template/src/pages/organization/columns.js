import React from 'react';
import { Icon,Popover } from 'antd';
import style from './common.less';
import {Global} from 'winning-megreziii-utils';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1071755_ckg8ra4f4pi.js',
});
const titleEdit='更新';
const titleDelete='删除';
export default (self)=>{
    const {organization}=self.props;
    return [
        {
            title: '机构名称',
            dataIndex: 'org_name',
            width: '40%',
        }, {
            title: '机构代码',
            dataIndex: 'org_id',
            width: '20%',
        }, {
            title: '备注',
            dataIndex:'memo',
            render: (text, record, index) => (
                <div className={style.operate}>
                    <Popover placement="topLeft" title="备注" content={Global.nullText(text)} >
                        <div className={style["winning-bz"]}>{Global.nullText(text)}</div>
                    </Popover>
                    { record.operate ?
                        <div>
                            <IconFont type="iconbianji" title={titleEdit} className={style.editIcon} onClick={()=>{self.goEdit(record)}}/>
	                        <IconFont type="iconshanchu" title={titleDelete} className={style.deleteIcon} onClick={()=>{Global.showConfirm({title:Global.BtnText.Delete,onConfirm:()=>{ organization.handleRemove(self,record)}})}}/>
                        </div> : <div></div>}
                </div>

            )
        }
    ]
}