import User from './pages/user';
import UserEdit from './pages/user/Operate/edit';
import UserEditOrganization from './pages/user/Operate/editOrganization';
import Role from './pages/role';
import RoleEdit from './pages/role/Operate/edit';
import RoleEditModule from './pages/role/Operate/editModule';
import RoleEditModuleResource from './pages/role/Operate/editModuleResource';
import Module from './pages/module';
import ModuleEdit from './pages/module/Operate/edit';
import Dict from './pages/dict';
import DictEdit from './pages/dict/Operate/edit';
import Organization from './pages/organization';
import OrganizationEdit from './pages/organization/Operate/edit';
import Login from './pages/Login/Login';
import License from './pages/License/License';

let router = {
    User,
    UserEdit,
    UserEditOrganization,
    Role,
    RoleEdit,
    RoleEditModule,
    RoleEditModuleResource,
    Module,
    ModuleEdit,
    Dict,
    DictEdit,
    Organization,
    OrganizationEdit,
    Login,
    License
};

export default router;
module.exports = router;