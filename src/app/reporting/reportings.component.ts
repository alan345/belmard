import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { PaiementQuoteService} from '../paiementQuote/paiementQuote.service';
import { PaiementQuote} from '../paiementQuote/paiementQuote.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location} from '@angular/common';
import { PaiementQuoteGraph } from './reporting.model'


@Component({
  selector: 'app-paiementQuotes',
  templateUrl: './reportings.component.html',
  styleUrls: ['./reporting.component.css'],
})
export class ReportingsComponent implements OnInit {
  // @Input() userId = '';
  @Input() idQuote = '';
  @Input() showHeader: boolean = true;
  @Output() getPaiementQuotesCross: EventEmitter<any> = new EventEmitter();
  @Input() showCreate: boolean = true;

  fetchedPaiementQuoteGraphs: PaiementQuoteGraph[] = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  search = {
    orderBy : '',
    search: '',
    idQuote:'',
  };

  constructor(
    private paiementQuoteService: PaiementQuoteService,
    private authService: AuthService,
  //  private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {}






  ngOnInit() {
    this.getPaiementQuotesInit()
  }





  // lineChart
    public lineChartData:Array<any> = [
      {data: [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], label: 'Series A'},
      // {data: [28, 48, 40, 19, 86, 27, 90, 0, 0 ,0, 0, 0], label: 'Series B'},
      // {data: [18, 48, 77, 9, 100, 27, 40, 0, 0 ,0, 0, 0], label: 'Series C'}
    ];
    public lineChartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'oct', 'nov','dec'];
    public lineChartOptions:any = {
      responsive: true
    };
    public lineChartColors:Array<any> = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    // public randomize():void {
    //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    //   for (let i = 0; i < this.lineChartData.length; i++) {
    //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //     }
    //   }
    //   this.lineChartData = _lineChartData;
    // }

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }









  getPaiementQuotesInit(){


    // this.search.orderBy = 'name'
    this.getPaiementQuotesGraph(2017, this.search)

  }

  searchPaiementQuotes(){}


  goBack() {
    this.location.back();
  }

  searchInput() {
    // this.getPaiementQuotes(this.paginationData.currentPage, this.search)
  }

  orderBy(orderBy: string) {
    // this.search.orderBy = orderBy
    // this.getPaiementQuotes(this.paginationData.currentPage, this.search)
  }

  // onDelete(id: string) {
  //   this.paiementQuoteService.deletePaiementQuote(id)
  //     .subscribe(
  //       res => {
  //         this.getPaiementQuotesInit()
  //         this.toastr.success('Great!', res.message);
  //         this.getPaiementQuotesCross.emit(this.fetchedPaiementQuotes)
  //         // console.log(res);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }


  // getPage(page: number) {
  //   this.loading = true;
  //   this.getPaiementQuotesGraph(page, this.search);
  // }


  getPaiementQuotesGraph(year: number, search: any) {
    this.paiementQuoteService.getPaiementQuotesGraph(year, search)
      .subscribe(
        res => {
          this.lineChartData = [{data: [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0], label: 'Paiements'}]
          this.paginationData = res.paginationData;
          this.fetchedPaiementQuoteGraphs =  res.item
          this.fetchedPaiementQuoteGraphs.forEach((element, index)=>{
             this.lineChartData[0].data[element._id.month - 1] = element.amountTotal
          })
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }


  isAdmin() {
    return this.authService.isAdmin();
  }


}
