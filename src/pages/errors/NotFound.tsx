import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="gradient bg-slate-400 text-white min-h-screen flex items-center">
      <div className="container mx-auto p-4 flex flex-wrap items-center">
        <div className="bg-slate-700 w-full md:w-5/12 text-center p-4">
          Try to back to home or contact us if problems occurs
        </div>
        <div className="w-full md:w-7/12 text-center md:text-left p-4">
          <div className="text-6xl font-medium">404</div>
          <div className="text-xl md:text-3xl font-medium mb-4">
            Oops. This page has gone missing.
          </div>
          <div className="text-lg mb-8">
            You may have mistyped the address or the page may have moved.
          </div>
          <Link to="/home" className="border border-white rounded p-4">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
