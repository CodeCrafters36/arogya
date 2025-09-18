



import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-blue-500">
        Welcome to the Home Page
      </h1>
      <Link to="/emergency" className="text-red-500 underline">
        Go to Emergency Page
      </Link>
      <br />
        <Link to="/gamezone" className="green-red-500 underline">
        Go to Gamezone
      </Link>
      <br />
        <Link to="/audio" className="green-red-500 underline">
        Go to Audio
      </Link>
      <br />
        <Link to="/article" className="green-red-500 underline">
        Go to Article
      </Link>
    </div>
  );
}
export default Home;
