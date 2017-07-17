import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CompanieService} from '../companie.service';
import {UserService} from '../../user/user.service';


import {Companie, Categorie0} from '../companie.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';

import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';

@Component({
  selector: 'app-companie',
  templateUrl: './editCompanie.component.html',
  styleUrls: ['../companie.component.css'],
})
export class EditCompanieComponent implements OnInit {
  fetchedCompanie: Companie = new Companie()

  userAdmins : User[] = []
  userManagers : User[] = []
  userClients : User[] = []
  usersSalesRep : User[] = []
  userStylists : User[] = []
  myForm: FormGroup;

  constructor(
    private companieService: CompanieService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService:AuthService,
    private userService:UserService
  ) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      categJson: this._fb.group({
        categProduct: [''],
        categProject: ['']
      }),
      option: this._fb.group({
        calendar: this._fb.group({
          timeBegin: ['', [Validators.required, Validators.minLength(1)]],
          timeEnd: ['', [Validators.required, Validators.minLength(1)]],
        }),
      }),
      address: this._fb.group({
        address: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      _users: this._fb.array([])
    })

    this.getCurrentUser()
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']) {
        if(params['id'] === 'mine') {
          this.getCompanie('')
        } else {
          this.getCompanie(params['id'])
        }
      }
    })
  }

  addCategProject(type, level, index1, index2, index3) {
    if(type==='project'){
      let newCategorie = new Categorie0()
      if(level === 0)
        this.fetchedCompanie.categories.categProject.unshift(newCategorie)
      if(level === 1)
        this.fetchedCompanie.categories.categProject[index1].subCateg.unshift(newCategorie)
      if(level === 2)
        this.fetchedCompanie.categories.categProject[index1].subCateg[index2].subCateg.unshift(newCategorie)
    }
  }

  removeCategProject(type, level, index1, index2, index3) {
    if(type==='project') {
      if(level === 0)
        this.fetchedCompanie.categories.categProject.splice(level, 1)
      if(level === 1)
        this.fetchedCompanie.categories.categProject.splice(index1, 1)
      if(level === 2)
        this.fetchedCompanie.categories.categProject[index1].subCateg.splice(index2, 1)
      if(level === 3)
        this.fetchedCompanie.categories.categProject[index1].subCateg[index2].subCateg.splice(index3, 1)
    }
  }


  fetchedCurrentUser: User = new User()
  getCurrentUser() {
    this.userService.getUser('')
      .subscribe(
        res => { this.fetchedCurrentUser = res },
        error => { console.log(error) }
      )
  }

  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedCompanie.forms.push(result)
      }
    })
  }

  removeForm(i: number) {
      this.fetchedCompanie.forms.splice(i, 1)
      this.save();
  }

  // removeUserFromCompanie(i:number, typeUser: string){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this[typeUser].splice(i, 1)
  //       this.save()
  //     }
  //   })
  // }

  save() {
//      this.fetchedCompanie.categories.categProject = [
//   {
//     "categ":"Devis Rénovation",
//     "subCateg": [
//       {
//         "categ":"Cuisine",
//         "subCateg": [
//           {"categ": "ok"}
//         ]
//       },
//       {
//         "categ":"Salle de Bain",
//         "subCateg": [
//           {"categ": "ok"}
//         ]
//       },
//       {
//         "categ":"Remise en conformité électrique",
//         "subCateg": [
//           {"categ": "ok"}
//         ]
//       },
//       {
//         "categ":"Maçonnerie",
//         "subCateg": [
//           {"categ": "ok"}
//         ]
//       },
//       {
//         "categ":"Peinture",
//         "subCateg": [
//           {"categ": "ok"}
//         ]
//       },
//       {
//         "categ":"PMR",
//         "subCateg": [
//           {"categ": "ok"}
//         ]
//       }
//     ]
//   },
//
//
//
//
//   {
//     "categ":"Intervention Immédiate",
//     "subCateg": [
//
//       {
//         "categ":"Plomberie",
//         "subCateg": [
//           {"categ": "Recherche de Fuite"},
//           {"categ": "Réparation De Fuite"},
//           {"categ": "Engorgement de canalisation"},
//           {"categ": "Ballon Eau chaude en panne"},
//           {"categ": "Robinneterie en panne"},
//           {"categ": "Wc en panne"},
//           {"categ": "Innondation"}
//         ]
//       },
//       {
//         "categ":"Electricité",
//         "subCateg": [
//           {"categ": "Recherche de panne électrique"},
//           {"categ": "Remplacement de tableau électrique "}
//         ]
//       },
//       {
//         "categ":"Serrurerie",
//         "subCateg": [
//           {"categ": "ouverture de porte"},
//           {"categ": "Remplacement de serrure"}
//         ]
//       },
//       {
//         "categ":"Vitrerie",
//         "subCateg": [
//           {"categ": "Remplacement de vitre à la coupe"},
//           {"categ": "Fermeture Provisoire"}
//         ]
//       },
//       {
//         "categ":"Chauffage",
//         "subCateg": [
//           {"categ": "Fuite Chaudiere ou Radiateur"},
//           {"categ": "Recherche de panne chaudiere"},
//           {"categ": "Contrat Entretien"},
//           {"categ": "Remplacement de Chaudiere "}
//         ]
//       }
//     ]
//   },
//
//
//
//
//   {
//     "categ":"Devis Installation",
//     "subCateg": [
//
//       {
//         "categ":"Menuiserie",
//         "subCateg": [
//           {"categ": "Double Vitrage rénovation"},
//           {"categ": "Vitre / Vitrine"},
//           {"categ": "Fenêtres"},
//           {"categ": "Survitrage"}
//         ]
//       },
//       {
//         "categ":"Chauffage",
//         "subCateg": [
//           {"categ": "Remplacement de chaudiere"},
//           {"categ": "Déplacement de chaudiere"},
//           {"categ": "Installation de radiateur"}
//         ]
//       },
//       {
//         "categ":"Petite Electricité",
//         "subCateg": [
//           {"categ": "Tirage de ligne électrique"},
//           {"categ": "Rajout de prise"}
//         ]
//       },
//       {
//         "categ":"Serrurerie",
//         "subCateg": [
//           {"categ": "Installation d\"une serrure de sécurité"},
//           {"categ": "Blindage de porte"},
//           {"categ": "Remplacement de porte"}
//         ]
//       },
//       {
//         "categ":"Plomberie",
//         "subCateg": [
//           {"categ": "Remplacement de Ballon eau chaude"},
//           {"categ": "Remplacement de robinneterie"},
//           {"categ": "Remplacement de WC"},
//           {"categ": "Tirage de ligne "}
//         ]
//       },
//       {
//         "categ":"Electricité",
//         "subCateg": [
//           {"categ": "Installation ou Remplacement Convecteur"}
//
//         ]
//       }
//     ]
//   },
//
//
//
//
//
//   {
//     "categ":"Électricité",
//     "subCateg": [
//
//       {
//         "categ":"Convecteur",
//         "subCateg": [
//           {"categ": "Convecteur électrique CASSETTE RAY SUNAIR 3600TC Thermor, ref : 497091"},
//           {"categ": "Convecteur électrique Thermor Equateur 2000W"},
//           {"categ": "Convecteur gamme Baleares 1500W horizontal tout compris"}
//         ]
//       },
//       {
//         "categ":"Disjoncteur",
//         "subCateg": [
//           {"categ": "Disjoncteur 10A"},
//           {"categ": "Disjoncteur 16A/ 30Mili"},
//           {"categ": "Disjoncteur 20A"},
//           {"categ": "Disjoncteur 32A"},
//           {"categ": "Disjoncteur C2"},
//           {"categ": "Disjoncteur Divers tri"}
//         ]
//       },
//       {
//         "categ":"Eclairage",
//         "subCateg": [
//           {"categ": "Interrupteur"},
//           {"categ": "Projecteurs"},
//           {"categ": "Lampes"}
//         ]
//       },
//       {
//         "categ":"Branchement",
//         "subCateg": [
//           {"categ": "Fils et câbles"},
//           {"categ": "Prises"}
//         ]
//       },
//       {
//         "categ":"Protection",
//         "subCateg": [
//           {"categ": "Protections de l\"habitat"},
//           {"categ": "Cartouches et fusibles"}
//         ]
//       }
//
//     ]
//   },
//
//
//   {
//     "categ": "Chauffage",
//     "subCateg": [
//
//       {
//         "categ": "Radiateurs",
//         "subCateg": [
//           {"categ": "Fixations de radiateurs"},
//           {"categ": "Radiateur thermoactif"},
//           {"categ": "Robinetterie de radiateurs"},
//           {"categ": "Accessoires"},
//           {"categ": "Sèche-serviettes"},
//           {"categ": "Habillage"}
//         ]
//       },
//       {
//         "categ":"Chaudière",
//         "subCateg": [
//           {"categ": "Bloc hydraulique"},
//           {"categ": "Système de sécurité surchauffe"},
//           {"categ": "Chaudière électrique"},
//           {"categ": "Thermostat"}
//         ]
//       }
//     ]
//   }
// ]
    //this.fetchedCompanie.categJson.categProduct = JSON.stringify(JSON.parse(this.fetchedCompanie.categJson.categProduct))
    if(this.fetchedCompanie._id) {
      this.companieService.updateCompanie(this.fetchedCompanie)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          //  this.router.navigate(['companie/' + this.fetchedCompanie._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.companieService.saveCompanie(this.fetchedCompanie)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            //  this.router.navigate(['companie/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }
  }


saveToMyCompanie(){
  this.companieService.saveCompanie(this.fetchedCompanie)
    .subscribe(
      res => {
        this.userService.addCompanieToMyself(res.obj)
          .subscribe(
            res => {
              // this.userService.cleanCurrentUserInSession()
              location.reload();
              this.toastr.success('Great!', res.message)
            },
            error => {console.log(error)}
          )
        this.toastr.success('Great!', res.message)
      },
      error => {console.log(error)}
    )
}
  // move(i: number, incremet: number, typeUser: string) {
  //   if(i>=0 && i<=this[typeUser].length + incremet) {
  //     var tmp = this[typeUser][i];
  //     this[typeUser][i] = this[typeUser][i + incremet]
  //     this[typeUser][i + incremet] = tmp
  //     this.save()
  //   }
  // }


  onDelete(id: string) {
    this.companieService.deleteCompanie(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          this.router.navigate(['companie/'])
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  goBack() {
    this.location.back();
  }



  getCompanie(id: string) {
    this.companieService.getCompanie(id, {})
      .subscribe(
        res => {
          this.fetchedCompanie = res
        },
        error => {
          console.log(error);
        }
      )
  }
  isAdmin() {
    return this.authService.isAdmin();
  }


}
