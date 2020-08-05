import React from 'react';
import Loader from "./Loader";

function ShowIdeas({ideas, setCurrentId, onDelete, request}) {
  let content = null;

  if(request.error){
    content = <div>
      <div className="bg-red-300 p-3">
        Currently there are no records
      </div>
    </div>
  }

  if(request.loading){
    content = <Loader/>
  }

  if(request.data){
    content =
       Object.keys(request.data).map(id => {
        return  <div className="col-lg-4 col-xs-12 text-center mt-2" key={id}
                     style={{marginBottom: "30px"}}>
          <div className="box h-100">
            <img src="/Idea.png" className="rounded mx-auto d-block" style={{width: "60px"}} alt="idea"/>
            <div className="box-title">
              <h4>{request.data[id].name}</h4>
              <p className="text-secondary">{request.data[id].dateTime}</p>
            </div>
            <div className="box-text">
              <h6>Category: {request.data[id].category}</h6>
              <h6>Rating: {request.data[id].rating}</h6>
              <h6>Description</h6>
              <span>{request.data[id].description}</span>
              <h6 className="mt-2">Expectations</h6>
              <span>{request.data[id].expectations}</span>
            </div>
            <div className="box-btn mt-2">
              <button className="btn btn-outline-success btn-sm mr-2" onClick={() => {setCurrentId(id)}}>
                Edit
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      })
  }

  return(
    <div className="row">
      {content}
    </div>
  )
}

export default ShowIdeas;