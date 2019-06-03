import React from 'react';
import Login from '@pages/Login/Login';
import './css/iconfont/font/iconfont.js';
import style from './css/iconfont/iconfont.less';
export default [
    {
        path: '/redirect',
        name: 'redirect',
        icon: '',
        redirect: '/dashboard/analysis'
    },{
        path: '/system',
        name: '系统管理',
        icon: (
            <svg className={style.icon} aria-hidden="true">
                <use xlinkHref="#icon-xitongshezhi"></use>
            </svg>
        ),
        authority: ['admin'],
        hidden: false,
        routes: [
            {
                path: '/system/user',
                name: '用户管理',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/user').default
            },
            {
                path: '/system/user/operate',
                name: '用户更新',
                authority: ['admin'],
                hidden: true,
                component: require('@pages/user/Operate/edit').default
            },
            {
                path: '/system/user/editOrganization',
                name: '用户组织',
                authority: ['admin'],
                hidden: true,
                component: require('@pages/user/Operate/editOrganization').default
            },
            {
                path: '/system/role',
                name: '角色管理',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/role').default
            },
            {
                path: '/system/role/operate',
                name: '角色更新',
                authority: ['admin'],
                hidden: true,
                component: require('@pages/role/Operate/edit').default
            },
            {
                path: '/system/role/operateModule',
                name: '分配模块',
                authority: ['admin'],
                hidden: true,
                component: require('@pages/role/Operate/editModule').default
            },
            {
                path: '/system/role/operateModuleResource',
                name: '分配资源',
                authority: ['admin'],
                hidden: true,
                component: require('@pages/role/Operate/editModuleResource').default
            },
            {
                path: '/system/module',
                name: '菜单管理',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/module').default
            },
            {
                path: '/system/module/operate',
                name: '菜单更新',
                authority: ['admin'],
                hidden: true,
                component: require('@pages/module/Operate/edit').default
            },
            {
                path: '/system/dict',
                name: '字典管理',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/dict').default
            },
            {
                path: '/system/dict/operate',
                name: '字典更新',
                authority: ['admin'],
                hidden: true,
                component: require('@pages/dict/Operate/edit').default
            },
            {
                path: '/system/organization',
                name: '系统组织',
                authority: ['admin'],
                hidden: false,
                component: require('@pages/organization').default
            },
            {
                path: '/system/organization/operate',
                name: '机构更新',
                authority: ['admin'],
                hidden: true,
                component: require('@pages/organization/Operate/edit').default
            }

        ]
    },
    // {
    //     path: '/Basic',
    //     name: 'Basic',
    //     icon: 'pie-chart',
    //     authority: ['admin'],
    //     hidden: false,
    //     routes:[
    //         {
    //             path: '/Basic/404',
    //             name: '404',
    //             icon: 'pie-chart',
    //             authority: ['admin'],
    //             hidden: false,
    //             component: require('@pages/ErrorPage/ErrorPage')
    //         },{
    //             path: '/Basic/500',
    //             name: '500',
    //             icon: 'pie-chart',
    //             authority: ['admin'],
    //             hidden: false,
    //             component: require('@pages/ErrorPage/ErrorPage')
    //         },{
    //             path: '/Basic/Upgrade',
    //             name: 'Upgrade',
    //             icon: 'pie-chart',
    //             authority: ['admin'],
    //             hidden: false,
    //             component: require('@pages/ErrorPage/ErrorPage')
    //         },
    //     ]
    // }
];


export const BasicsRouter=[
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/License',
        component: require('@pages/License/License').default
    }
];

