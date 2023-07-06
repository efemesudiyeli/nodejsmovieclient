import Helmet from "react-helmet";

import Navbar from "../components/Navbar";

import WatchedListMovies from "../components/WatchedListMovies";

export default function WatchedMovies() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MovieAPP | Watched</title>
      </Helmet>

      <Navbar />

      <WatchedListMovies />
    </div>
  );
}
