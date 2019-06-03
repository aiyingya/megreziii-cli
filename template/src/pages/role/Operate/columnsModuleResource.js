import React from 'react';
import {Popover} from 'antd';
import {Global} from 'winning-megreziii-utils';
import style from '../common.less'
export default ()=>{
    return [
        {
            title: '资源类型',
            dataIndex: 'zy_lx',
            key: 'zy_lx',
            width:98
        }, {
            title: '页面ID',
            dataIndex: 'ym_id',
            key: 'ym_id',
            width:98
        },
        {
            title: '备注',
            dataIndex: 'bz',
            key: 'bz',
            width:98,
            render: (text, record, index) => (
                <Popover placement="topLeft" title="备注" content={Global.nullText(text)} >
                    <div className={style["winning-bz"]}>{Global.nullText(text)}</div>
                </Popover>
            )
        }
    ]
}