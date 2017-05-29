import { Form } from '../form/form.model'

export interface Press {
  _id: string;
  title: string;
  link: string;
  owner:Owner[];
  formPDF:Form[];
  form:Form[];
  // date: {
  //   dateBegin:Date;
  //   dateEnd:Date;
  // }
}


export interface Owner {
  _id: string;
}
