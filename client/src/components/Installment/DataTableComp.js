import React, { Component } from 'react';
import '../../css/Datatables.css';
import 'datatables.net-responsive';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis';
// import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.print';


const $=require('jquery');
$.DataTable=require('datatables.net-bs5');



export class DataTableComp extends Component {

  constructor(){
    super();
    this.installmentTableData=[];
  }

  state={
    checkBallot:false,
    checkPosession:false,
  }

  componentDidMount(){
  
    const {totalAmount,remainingBalance,installmentPerMonth,possesionAmount,installmentCount,ballotPaid,possesion,halfYearPayment,totalInstallmentCount,bookingAmount,ballotAmount,fine,requestCount,}=this.props.installmentPlan;
    const {pending,setPending}=this.props;
    // const {requestApprovalInformation}=this.props; 

    if(!pending)
    setPending(requestCount+1>installmentCount? true:false);

   
    let installment;
    for (let index = 1; index <= totalInstallmentCount; index++) {
      installment=[];
      // Count
      installment.push(index);
      // Booking Amount
      index===1 ? installment.push(bookingAmount) :installment.push('_');
      // Ballot Amount
      // <button btn-primary > Add </button>
      if(!ballotPaid && index===installmentCount+1){
        this.checkBallot? installment.push( ballotAmount ):installment.push( `<button type="button" class="btn btn-sm btn-primary show_table_btn2">Add</button>` );
      }else{
        installment.push('_')
      }
      //Possession Amount
      if(!possesion && index===installmentCount+1){
        this.checkPosession? installment.push( possesionAmount ):installment.push( `<button type="button" class="btn btn-sm btn-primary show_table_btn2">Add</button>` );
       }else{
         installment.push('_')
       }
      // Installment Amount
      installment.push(installmentPerMonth);
      //Half year Payment
      index%6===0 ? installment.push(halfYearPayment):installment.push('');
      // Fine Amount
      //TODO : We must generate fine at frontend and set it on backend.
      installment.push(fine);
      //Total
      let total=0;
      total+=installmentPerMonth+fine;
      if(index===1) total+=bookingAmount;
      if(this.checkBallot && !ballotPaid) total+=ballotAmount;
      if(this.checkPosession && !possesion) total+=possesionAmount;
      if(index%6===0) total+=halfYearPayment;
      installment.push(total);
     
      //Status 
      if(index<installmentCount+1) installment.push(`<button type="button" class="btn btn-sm btn-secondary show_table_btn show_table_btn_paid" disabled='true'>Paid</button>`)
      if ( index===installmentCount+1 ){
        if(!pending) 
        installment.push( `<button type="button" class="btn btn-sm btn-success show_table_btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Pay & Approve</button>` )
        else {

          installment.push( `<button disabled='true' type="button" class="btn btn-sm btn-secondary show_table_btn">Pending</button>` )
        }

      }
      if(index>installmentCount+1) installment.push(`<button disabled='true' type="button" class="btn btn-sm btn-danger show_table_btn">Pay</button>`)

      this.installmentTableData.push(installment)

    }

    this.$el=$(this.el);
    this.$el.DataTable({
    "dom": '<"dt-buttons"Bf><"clear">lirtp',
    "paging": true,
    "pageLength": 12,
    "autoWidth": false, 
    "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false ,
    "aaSorting": [],
    "searching" :false,
    "columnDefs": [
      { "orderable": false,"width": "5px", "targets": 0 },
      { "orderable": false,"width": "35px", "targets": 1 },
      { "orderable": false, "width": "30px", "targets": 2 },
      { "orderable": false, "width": "30px", "targets": 3 },
      { "orderable": false,"width": "42px", "targets": 4 },
      { "orderable": false, "width": "30px", "targets": 5 },
      { "orderable": false,"width": "28px", "targets": 6 },
      { "orderable": false,"width": "35px", "targets": 7 },
      { "orderable": false, "width": "60px", "targets": 8 }
    ],
    "buttons": [
      // 'copyHtml5',
      'csvHtml5',
      'excelHtml5',
      'print'
    ]
    , 
  "data": this.installmentTableData
  ,
  
  
})
 }
 componentWillUnmount(){
   
 }
 
  render() {
    return (
<div className="show_table">  
  <table  className="table table-striped table-bordered display  table-dark inner_table"  cellSpacing="0" width="100%" ref={el=> this.el=el}>
  
  <thead>
      <tr>
        <th className="headings px-3">No.</th>
        <th className="headings px-3">Booking</th>
        <th className="headings px-3">Balloting</th>
        <th className="headings px-3">Possession</th>
        <th className="headings px-3">Installment</th>
        <th className="headings px-3">Half Year </th>
        <th className="headings px-3">Fine</th>
        <th className="headings px-3 ">Total</th>
        <th className="headings px-3 ">Status</th>
  
      </tr>
    </thead>
 
  </table>

</div>

    
    )
  }
}



export default DataTableComp



      
