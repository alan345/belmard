module.exports = {
    sum: function(a,b) {
        return a+b
    },
    multiply: function(a,b) {
        return a*b
    },
    isCurentUserHasAccess(user, nameObject, typeAccess) {
      if(user.isAdminOfHisCompanie)
        return true

      let rights = JSON.parse(JSON.stringify(user.right))
      let permissionBool = false

      rights.forEach(right => {
        right.detailRight.permissions.forEach(permission => {
          if(permission.namePermission === nameObject)
            permission.access.forEach(singleAccess=> {
              if(singleAccess.typeAccess === typeAccess)
                permissionBool = true
            })
        })
      })
      return permissionBool
    }
};
