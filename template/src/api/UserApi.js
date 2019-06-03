import {Loader} from 'winning-megreziii-utils';

import dictionary from './mock/User/dict';
import userList from './mock/User/user_list';
import userRemove from './mock/User/user_update';
import userOperate from './mock/User/user_update';
import userRoleUpdate from './mock/User/user_update';
import userRoleList from './mock/User/user_role_list';
import roleList from './mock/User/role_list';
import orgList from './mock/User/organize_list';
import userOrgUpdate from './mock/User/user_update';
import userUnique from './mock/User/user_unique';
import userResource from './mock/User/user_resource';
import orgTree from './mock/User/organize_tree';

const api = {
	Dictionary: '/rest/bs/auth/dict_type',
	UserList: '/rest/bs/auth/user_list',
	UserRemove:'/rest/bs/auth/user_delete',
	UserUpdate:'/rest/bs/auth/user_update',
    UserRoleUpdate:'/rest/bs/auth/user_role_update',
    UserRoleList:'/rest/bs/auth/user_role_list',
    RoleList:'/rest/bs/auth/role_list',
    OrgList:'/rest/bs/auth/organize_tree',
    UserOrgUpdate:'/rest/bs/auth/update_user_organize',
    UserUnique:'/rest/bs/auth/user_unique',
    UserResource:"/rest/bs/auth/user_resource",
    OrgTree:"/rest/bs/auth/query_organize_by_name",
};
export default Loader.batchExport(
    api,
    [dictionary,userList,userRemove,userOperate,userRoleUpdate,userRoleList,roleList,orgList,
        userOrgUpdate,userUnique,userResource,orgTree]
);