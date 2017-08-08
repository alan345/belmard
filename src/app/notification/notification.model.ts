
export class Notification {
  _id: string = '';

  detailNotification: DetailNotification = new DetailNotification()
}

export class DetailNotification {
  nameNotification: string = '';
  permissions: Permission[] = []
}

export class Permission {
  namePermission: string = '';
  access: Access[] = []
}

export class Access {
  typeAccess: string= '';
}
