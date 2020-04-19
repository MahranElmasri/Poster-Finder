import React from "react";
import PosterItem from "./PosterItem";
import PropTypes from "prop-types";

export default function Posters({ posters, events, users }) {
  return (
    <div className="container grid-2">
      {posters.length
        ? posters.map(poster => (
            <PosterItem
              key={poster.id}
              poster={poster}
              events={events}
              users={users}
            />
          ))
        : null}
    </div>
  );
}

Posters.propTypes = {
  posters: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
};
