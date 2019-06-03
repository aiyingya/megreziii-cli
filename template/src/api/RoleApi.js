import {Loader} from 'winning-megreziii-utils';

import roleModuleResourceList from './mock/Role/resource_list';
import dictionary from './mock/Role/dict';
import roleList from './mock/Role/role_list';
import roleRemove from './mock/Role/role_update';
import roleUpdate from './mock/Role/role_update';
import moduleList from './mock/Role/module_list';
import allotRoleModule from './mock/Role/role_update';
import hasRoleModule from './mock/Role/module_list';//'./mock/Role/role_module_list';
import saveModuleResource from './mock/Role/role_update';
import userResource from './mock/Role/user_resource';

const api = {
    RoleModuleResourceList:'/rest/bs/auth/role_module_resource',
	Dictionary: '/rest/bs/auth/dict_type',
	RoleList: '/rest/bs/auth/role_list',
	RoleRemove:'/rest/bs/auth/role_delete',
    RoleUpdate:'/rest/bs/auth/role_update',
    ModuleList:'/rest/bs/auth/module_list',
    AllotRoleModule:'/rest/bs/auth/allot_role_module',
    HasRoleModule:'/rest/bs/auth/role_module',//,'/rest/bs/auth/user_module'
    SaveModuleResource:'/rest/bs/auth/moduel_resource_update',
    UserResource:"/rest/bs/auth/user_resource"
};
export default Loader.batchExport(
    api,
    [roleModuleResourceList,dictionary,roleList,roleRemove,roleUpdate,moduleList,allotRoleModule,
        hasRoleModule,saveModuleResource,userResource]
);
