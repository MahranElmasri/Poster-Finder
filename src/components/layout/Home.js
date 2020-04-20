import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Posters from "../Posters";
import PosterCard from "../PosterCard";
import Pagination from "./Pagination";
import Spinner from "./Spinner";

export default function Home(props) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [poster, setPoster] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [grid, setGrid] = useState(false);

  const fetchData = async query => {
    setLoading(true);
    const res = await axios(`/v3/posters/search?query=${query}`);
    setLoading(false);
    setResult(res.data);
  };

  const getPoster = async id => {
    setLoading(true);
    const res = await axios(`/v2/posters/${id}`);
    setLoading(false);
    setPoster(res.data);
  };

  const onSearch = query => {
    fetchData(query);
  };
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const { posters = [], events = [], users = [] } = result;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currntPosts = posters.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <Router>
        <Navbar onSearch={onSearch} />

        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              loading ? (
                <Spinner />
              ) : (
                <div>
                  {currntPosts.length > 0 ? (
                    <div>
                      <button
                        onClick={() => {
                          setResult([]);
                        }}
                        className="btn-right btn btn-danger"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => {
                          setGrid(!grid);
                        }}
                        className="btn-right btn"
                      >
                        {grid ? "List View" : "Grid View"}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <Posters
                    posters={currntPosts}
                    events={events}
                    users={users}
                    grid={grid}
                  />
                  <Pagination
                    paginate={paginate}
                    postsPerPage={postsPerPage}
                    totalPosts={posters.length}
                  />
                </div>
              )
            }
          />

          <Route
            exact
            path="/poster/:id"
            render={props => (
              <PosterCard
                {...props}
                getPoster={getPoster}
                poster={poster}
                loading={loading}
                posters={currntPosts}
                onSearch={onSearch}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}
