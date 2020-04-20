import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PosterItem.css";

export default function PosterItem({ poster, events, users }) {
  const {
    id,
    title,
    author_names,
    keywords,
    event,
    score,
    uploaded_at
  } = poster;
  const eventList = events.find(e => e.id === event).name;

  return (
    <div className="card border-light mb-3">
      <div className="card-header">
        <b>Title: </b>
        {title}
      </div>
      <div className="card-body">
        <div className="card-title">
          <b>Author name: </b> <span>{author_names}</span>
        </div>
        <div>
          <b>Event: </b> {eventList}
        </div>
        <div>
          <b>Uploaded: </b>
          {uploaded_at.split("T")[0]}
        </div>
        <div>
          <b>Score: </b> {Math.ceil(score)}
        </div>
        <div className="card-text">
          {keywords.length > 0 ? (
            <div>
              <div>
                <b> Keywords: </b>
                {keywords.map(keyword => (
                  <span key={keyword} className="badge">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="card-footer">
        <Link to={`/poster/:${id}`} className="btn btn-success btn-sm my-1">
          {`More>>`}
        </Link>
      </div>
    </div>
  );
}

PosterItem.propTypes = {
  poster: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
};
