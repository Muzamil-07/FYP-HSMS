import React from 'react'

const Confirmation=( props ) => {

  return (
    <div>
      {/*Button trigger modal*/}
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmation">
        Launch static backdrop modal
      </button> */}
      {/*Modal */}
      <div className="modal fade" id="confirmation" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Are you sure?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
              <button type="button" className="btn btn-success"  data-bs-dismiss="modal" onClick={props.handleClick}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Confirmation