import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./PosterCard.css";
import Spinner from "./layout/Spinner";

export default function PosterCard(props) {
  const id = props.match.params.id.split(":")[1];
  const { poster = {}, event = {}, users = [] } = props.poster;

  const {
    paper_abstract = null,
    _co_authors = [],
    keywords = [],
    title = null,
    fileid = null,
    filetype = null
  } = poster;

  const { name = null, location = null, website_url = null } = event;
  const [department] = users.map(i => i.department);
  const [organization] = users.map(i => i.organization);
  const author_name = props.posters.find(e => e.id === id);

  useEffect(() => {
    props.getPoster(id);
  }, []);

  return (
    <div className="container">
      {props.loading ? (
        <Spinner />
      ) : (
        <div className="wrapper">
          <div className="box1 text-center">
            <h3>{name}</h3>
            <h2>{title}</h2>
            <div>
              <i className="fas fa-users" /> {_co_authors.join(", ")}
            </div>
            <div className="fas fa-university">
              <b> {organization}</b>
            </div>
            <h4>{department}</h4>
            <div>
              <li className="fas fa-map-marker-alt" /> {location}
            </div>
            <div className="fas fa-link">
              <a href={website_url} rel="noopener noreferrer">
                {" "}
                {website_url}
              </a>
            </div>
            <hr />
          </div>
          <div className="box2">
            <div>
              <b>Abstract: </b>
            </div>
            <div className="abstract">
              {paper_abstract ? paper_abstract : "Abstract not available !"}
            </div>
            <div>
              <b>Author: </b>
            </div>
            <div>{author_name ? author_name.author_names : null}</div>
            <div>
              <b>Keywords: </b>
            </div>
            <div>{keywords.join(", ")}</div>
            <div>
              <b>File Id: </b>
            </div>
            <div>{fileid}</div>
            <div>
              <b>File Type:</b>
            </div>
            {filetype && <div className="fas fa-file-pdf"> </div>}
          </div>
        </div>
      )}
    </div>
  );
}

PosterCard.propTypes = {
  poster: PropTypes.object,
  posters: PropTypes.array,
  getPoster: PropTypes.func,
  event: PropTypes.object,
  users: PropTypes.array
};
