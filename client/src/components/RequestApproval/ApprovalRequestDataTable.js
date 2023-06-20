import React, { Component } from 'react';
import '../../css/Datatables.css';
import 'datatables.net-responsive';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis';
// import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.print';
import UsersContext from '../../context/users/UsersContext';


const $=require( 'jquery' );
$.DataTable=require( 'datatables.net-bs5' );



export class ApprovalRequestDataTable extends Component {
  static contextType=UsersContext;


  constructor( props ) {
    super( props );

  }


  getAllRequests=() => {

    const requests=this.props.requests;


    const updatedArray=[];

    requests.forEach( ( element, i ) => {

      const handleClick=this.props.handleClick;
      let req=[];

      req.push( i+1 )
      req.push( element.user.CNIC )
      req.push( `${element.user.firstName} ${element.user.lastName}` )
      req.push( element.plot.plotNo )
      req.push( element.plot.block )
      req.push( element.installment.installmentCount+1 )
      req.push( `<button type="button" class="btn btn-sm btn-dark show_table_btn" data-bs-toggle="modal" data-bs-target="#approvalRequestModal" aid=${element.id} ${onclick=( e ) => handleClick( e )}>View</button>` )

      updatedArray.push( req );


    } );

    return updatedArray;
  }


  componentDidMount() {


    const d=this.getAllRequests();
    this.$el=$( this.el );


    this.DT=this.$el.DataTable( {
      "dom": '<"dt-buttons"Bf><"clear">lirtp',
      "paging": true,

      "columnDefs": [
        { "orderable": false, "width": "10px", "targets": 0 },
        { "orderable": false, "width": "30px", "targets": 1 },
        { "orderable": true, "width": "40px", "targets": 2 },
        { "orderable": false, "width": "20px", "targets": 3 },
        { "orderable": false, "width": "25px", "targets": 4 },
        { "orderable": false, "width": "25px", "targets": 5 },
        { "orderable": false, "width": "30px", "targets": 6 },
      ],
      "buttons": [
        // 'copyHtml5',
        'csvHtml5',
        'excelHtml5',
        'print'
      ]
      ,
      "data": d,



    } )

   


  }


  fetchAndRelaodData=()=>{
    this.props.getRequests();
  };

  render() {
    return (
      <div className="show_table">
        <button className='btn-reload badge bg-primary p-2 mx-1 text-white' onClick={this.fetchAndRelaodData}>
     <i class="fa-solid fa-rotate"></i>
     </button>
        <table className="table table-striped table-bordered display  table-dark inner_table" cellSpacing="0" width="100%" ref={el => this.el=el}>
          <thead>
            <tr>
              <th className="headings px-3">No.</th>
              <th className="headings px-3">CNIC</th>
              <th className="headings px-3">Name</th>
              <th className="headings px-3">Plot No</th>
              <th className="headings px-3">Block</th>
              <th className="headings px-3 ">Installment No</th>
              <th className="headings px-3 ">Action</th>
            </tr>


          </thead>

        </table>

      </div>


    )
  }
}



export default ApprovalRequestDataTable;




