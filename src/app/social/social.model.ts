

export interface Social {
  _id: string;
  name: string;
  form: string;
  owner: string;
  date: {
    dateBegin:Date;
    dateEnd:Date;
  }
}
