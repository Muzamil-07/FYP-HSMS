import React, { Component } from "react";
import "../../css/Datatables.css";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.colVis";
// import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.flash";
// import "datatables.net-buttons/js/buttons.print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const $ = require("jquery");
$.DataTable = require("datatables.net-bs5");

export class DataTableComp extends Component {
  constructor() {
    super();
    this.feedbackTableData = [];
  }

  getAllFeedbacks = async () => {
    const feedbacks = this.props.feedbacks;
    for (let i = 0; i < feedbacks.length; i++) {
      let feedback = [];
      feedback.push(i);
      feedback.push(feedbacks[i].name);
      feedback.push(feedbacks[i].email);
      feedback.push(feedbacks[i].subject);
      feedback.push(feedbacks[i].description);
  
      this.feedbackTableData.push(feedback);
    }
  };

  componentDidMount() {
    this.getAllFeedbacks();
    this.$el = $(this.el);
    this.$el.DataTable({
      dom: '<"dt-buttons"Bf><"clear">lirtp',
      paging: true,
      // "bPaginate": false,
      // "bLengthChange": false,
      // "bFilter": true,
      // "bInfo": false,
      // "bAutoWidth": false ,
      "aaSorting": []
,
      columnDefs: [
        { orderable: false, width: "1px", targets: 0 },
        { orderable: false, width: "10px", targets: 1 },
        { orderable: false, width: "20px", targets: 2 },
        { orderable: false, width: "30px", targets: 3 },
        { orderable: false, width: "30px", targets: 4 },
      ],
      buttons: [],
      data: this.feedbackTableData,
    });
  }

  fetchAndRelaodData=()=>{
  this.props.getFeedbacks();
  };


  render() {
    return (
      <div className="show_table">
        <div
          style={{
            position: "relative",
             textAlign:'right',
            // float: "right",
            top: "7rem",
            cursor: "pointer",
          }}
        >
           <button className='badge bg-primary p-2 mx-1 text-white btn-reload btn_reload_feedback' onClick={this.fetchAndRelaodData}>
     <i class="fa-solid fa-rotate"></i>
     </button>
          <button class={`badge bg-danger ${this.props.feedbacks.length===0? 'btn_disable':''}`} style={{ padding: "5.5px", fontSize: '14px' }} disabled={this.props.feedbacks.length===0} onClick={() => this.props.deleteAllFeedbacks()}>
          <FontAwesomeIcon icon={faTrashCan} color="white" />
          </button>
        </div>

        <table
          className="table table-striped table-bordered display  table-dark inner_table"
          cellSpacing="0"
          width="100%"
          ref={(el) => (this.el = el)}
        >
          <thead>
            <tr>
              <th className="headings px-2">No.</th>
              <th className="headings px-2">Name</th>
              <th className="headings px-2">Email</th>
              <th className="headings px-2">Subject</th>
              <th className="headings px-2 ">Description</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default DataTableComp;
