import ListMovies from "../components/ListMovies";
import Helmet from "react-helmet";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MovieAPP | Homepage</title>
      </Helmet>
      <Navbar />
      <h1 className="text-3xl text-white font-bold">
        Hoşgeldin! Bugün ne izlemek istersin?
      </h1>

      <ListMovies />
    </div>
  );
}
