import React from "react";

const RecentFeedbacks = () => {
  return (
    <div
      className="glassomorphic-effect rounded-2"
      style={{ height: "240px", overflowY: "scroll" }}
    >
      <h4
        id="navbar-example2"
        className="border-bottom border-dark px-3 py-2 mb-3 text-blue"
      >
        Recent Feedbacks
      </h4>

      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-root-margin="0px 0px -40%"
        data-bs-smooth-scroll="true"
        className="scrollspy-example p-3 rounded-2"
        tabIndex={0}
      >
        <h4 id="scrollspyHeading1">First heading</h4>
        <p>...</p>
        <h4 id="scrollspyHeading2">Second heading</h4>
        <p>...</p>
        <h4 id="scrollspyHeading3">Third heading</h4>
        <p>...</p>
        <h4 id="scrollspyHeading4">Fourth heading</h4>
        <p>...</p>
        <h4 id="scrollspyHeading5">Fifth heading</h4>
        <p>...</p>
      </div>
    </div>
  );
};

export default RecentFeedbacks;
