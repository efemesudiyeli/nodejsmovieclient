import ListMovies from "../components/ListMovies";
import Helmet from "react-helmet";
import Navbar from "../components/Navbar";

import Hero1 from "../components/Hero1";



export default function Home() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MovieAPP | Homepage</title>
      </Helmet>
      <Navbar />
      <Hero1 />
      <ListMovies />

      
    </div>
  );
}
