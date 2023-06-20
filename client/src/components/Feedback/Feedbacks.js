import React from "react";
import { useState, useEffect, useContext } from "react";
import UsersContext from "../../context/users/UsersContext";
import Api from "../../Api";
import FeedbacksDataTable from "./FeedbacksDataTable";
import AppContext from "../../context/appState/AppContext";
import { message } from 'antd';



export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackDetails, setFeedbackDetails] = useState({});
  const { Cookies } = useContext(UsersContext);
  const {showAlert} = useContext(AppContext)

  const getFeedbacks = async () => {
    const cookie = Cookies.get("jwt");

    const res = await Api.get("complaints", {
      headers: { Authorization: `Bearer ${cookie}` },
    });
    setFeedbacks(res.data.data.data);
  };

  const deleteAllFeedbacks = async ()=>{
    const cookie = Cookies.get("jwt");

    const res = await Api.delete("complaints/deleteall", {
      headers: { Authorization: `Bearer ${cookie}` },
    });
    if(res.data.length===0){
      // showAlert( "All feedbacks deleted", "success" )

      message.success( "All feedbacks deleted" );
      setFeedbacks([])
    }
  }

  
  const getAllFeedbackDetails =  (e,id) => {
    if(e.target.classList.contains("show_table_btn")){
      const data= feedbacks.filter(el=>el.id===id)
      setFeedbackDetails(data[0])
    }
    
  };

  
  useEffect(() => {
    getFeedbacks();
  }, []);

//   console.log(feedbacks)

  //   {console.log(feedbacks)}
  return (
    <div>
     {<FeedbacksDataTable deleteAllFeedbacks={deleteAllFeedbacks} key={feedbacks} feedbacks={feedbacks} getAllFeedbackDetails={getAllFeedbackDetails} getFeedbacks={getFeedbacks}/>}
    </div>
  );
}
