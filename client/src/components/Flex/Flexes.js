import React from 'react'
import { FormHeading } from "./FormHeading";
import './../css/flex.css'
import $ from 'jquery';
import { useEffect } from 'react';


export default function Flexes() {

  const uploadFlex = () => {


    const btnUpload = $("#upload_file"),
      btnOuter = $(".button_outer");
    btnUpload.on("change", function (e) {
      const ext = btnUpload.val().split('.').pop().toLowerCase();
      if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
        $(".error_msg").text("Not an Image...");
      } else {
        $(".error_msg").text("");
        btnOuter.addClass("file_uploading");
        setTimeout(function () {
          btnOuter.addClass("file_uploaded");
        }, 3000);
        const uploadedFile = URL.createObjectURL(e.target.files[0]);
        setTimeout(function () {
          $("#uploaded_view").append('<img src="' + uploadedFile + '" />').addClass("show");
        }, 3500);
      }
    });
    $(".file_remove").on("click", function (e) {
      $("#uploaded_view").removeClass("show");
      $("#uploaded_view").find("img").remove();
      btnOuter.removeClass("file_uploading");
      btnOuter.removeClass("file_uploaded");
    });
  }


  useEffect(() => {
    uploadFlex()
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <FormHeading value='Flexes' />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
            <div className="panel">
              <div className="button_outer">
                  <form>
                <div className="btn_upload">
                  <input type="file" id="upload_file" name="" />
                  Upload Image
                </div>
                <div className="processing_bar"></div>
                {/* <button className="success_box btn"></button> */}
                  </form>
              </div>
            </div>
            <div className="error_msg"></div>
            <div className="uploaded_file_view" id="uploaded_view">
              <span className="file_remove">X</span>
            </div>
          </div>
      </div>
      </div>

  )
}
