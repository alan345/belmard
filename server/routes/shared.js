module.exports = {
    // sum: function(a,b) {
    //     return a+b
    // },
    // multiply: function(a,b) {
    //     return a*b
    // },
    isCurentUserHasAccess(user, nameObject, typeAccess) {
      // console.log(user, nameObject, typeAccess)
      if(!user.right) {
        return true;
      }


      // if(user.isAdminOfHisCompanie)
      //   return true
      // if(!user.right) {
      //   console.log('aaaaaa')
      //   return false;
      // }
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
