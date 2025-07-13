const Authorizations = Object.freeze({
    super_admin: 'super_admin',
    rules: {
        create_rule: 'create',
        read: 'read',
        update: 'update',
        delete: 'delete'
    },

    violations: {
        create: 'create',
        read: 'read',
    },

    employees: {
        can_login: 'can_login',
        can_create: 'can_create'
    }
})

const Roles = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
  };

const RolePermissions = {
    [Roles.SUPER_ADMIN]: [
      Authorizations.rules.create_rule,
      Authorizations.rules.read,
      Authorizations.rules.update,
      Authorizations.rules.delete,
      Authorizations.violations.create,
      Authorizations.violations.read,
      Authorizations.employees.can_login,
    ],
  
    [Roles.ADMIN]: [
      Authorizations.rules.read,
      Authorizations.violations.read,
      Authorizations.employees.can_login,
      Authorizations.employees.can_create,
    ],
  
    [Roles.EMPLOYEE]: [
      Authorizations.employees.can_login,
      Authorizations.employees.can_create,
      Authorizations.rules.create_rule,
    ],
  };
  

const FORBIDDEN = 403

const createEmployee = (token) => {
    const admin = {
        authorizations: RolePermissions[Roles.ADMIN]
    }

    if(admin.authorizations.includes(Authorizations.employees.can_create)) {
        return {
            id: 1,
            name: 'Test Employee',
            email: '5YqgI@example.com',
            authorizations: RolePermissions[Roles.EMPLOYEE]
        }
    }
}
const admin = {
    authorizations: RolePermissions[Roles.ADMIN]
}

const employee = createEmployee(admin)


function simulateCreateRules(employee) {
    if(!employee.authorizations.includes(Authorizations.rules.create_rule)) {
        throw 'You do not have permission to create rules'
    }

    console.log('employee has permission to create rules')
}

simulateCreateRules(employee)

function removePermission(user, permission) {

    if(user.authorizations.includes(permission)) {
        const index = user.authorizations.indexOf(permission);
        user.authorizations.splice(index, 1);
        user.authorizations = user.authorizations;
        console.log('removed permission')
    }
}

function addPermission(user, permission) {
    if(!user.authorizations.includes(permission)) {
        user.authorizations.push(permission);
        user.authorizations = user.authorizations;
        console.log('added permission')
    }
}

function updatePermissionsList(user, permissions) {
    user.authorizations = permissions;
    user.authorizations = user.authorizations;
}

function hasPermission(user, permission) {
    return user.authorizations.includes(permission)
}

// removePermission(employee, Authorizations.employees.can_login);
console.log(hasPermission(employee, Authorizations.employees.can_login));
