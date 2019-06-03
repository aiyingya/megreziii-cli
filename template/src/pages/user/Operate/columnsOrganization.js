import React from 'react';
import {Popover} from 'antd';
import {Global} from 'winning-megreziii-utils';
import style from '../common.less'
export default ()=>{
	return [
		{
			title: '机构名称',
			dataIndex: 'org_name',
            width: '40%'
		},
		{
			title: '机构代码',
			dataIndex: 'org_id'
		},
		{
			title: '备注',
			dataIndex: 'memo',
            render: (text, record, index) => (
                <div className={style.operate}>
                    <Popover placement="topLeft" title="备注" content={Global.nullText(text)} >
                        <div className={style["winning-bz"]}>{Global.nullText(text)}</div>
                    </Popover>
                </div>
            )
		}
	]
}