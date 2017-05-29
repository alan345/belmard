
import { Form } from '../form/form.model';

export interface Options {
  design: Design
}

export interface Design {
  mainPage: MainPage
}

export interface MainPage {
  titleHomePage: string;
  buttonHomePage: string;
  linkButtonHomePage: string;
  _imgHome1 : Form[];
  _imgHome2 : Form[];
  _imgHome3 : Form[];
  _imgHome4 : Form[];
  _imgHome5 : Form[];
  _imgHome6 : Form[];
}
