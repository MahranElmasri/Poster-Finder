import React from "react";
import PosterItem from "./PosterItem";
import PropTypes from "prop-types";
import Intro from "../components/layout/Intro";

export default function Posters({ posters, events, users, grid }) {
  const isGrid = grid ? "grid-2" : "list";
  return (
    <div className={`container ${isGrid}`}>
      {posters.length ? (
        posters.map(poster => (
          <PosterItem
            key={poster.id}
            poster={poster}
            events={events}
            users={users}
          />
        ))
      ) : (
        <div>
          <h1 className="text-center">
            Welcome to Poster Finder Page <li className="fas fa-search" />
          </h1>
          <br />
          <Intro />
        </div>
      )}
    </div>
  );
}

Posters.propTypes = {
  posters: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  grid: PropTypes.bool.isRequired
};
