import React from "react";

const PostsCard = (props) => {
  return (
    <>
      <div className="card my-3" style={{ width: "18rem" }}>
        <img src={props.image} className="card-img-top img-fluid" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.desc}</p>
          <a href="no" className="btn blue-buttons me-4">
            {props.edit}
          </a>
          <a href="no" className="btn blue-buttons ms-4">
            {props.delete}
          </a>
        </div>
      </div>
    </>
  );
};

export default PostsCard;
