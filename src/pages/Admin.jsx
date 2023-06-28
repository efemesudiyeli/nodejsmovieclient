import AddMovieForm from "../components/AddMovieForm";
import MinimizeListMovies from "../components/MinimizeListMovies";

import Helmet from "react-helmet";
export default function Admin() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MovieAPP | Admin</title>
      </Helmet>

      <div className="flex justify-center flex-col items-center h-full">
        <div>
          <div className="mb-20">
            <MinimizeListMovies />
          </div>
          <div>
            <AddMovieForm />
          </div>
        </div>
      </div>
    </>
  );
}
