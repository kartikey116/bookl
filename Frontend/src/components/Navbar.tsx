import { Link } from "react-router-dom";
import logo from "/logo.svg"; 

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Highway Delite Logo"
            className="w-10 h-10 object-contain"
          />
          <div className="text-sm font-medium leading-4">
            highway
            <div className="text-xs">delite</div>
          </div>
        </Link>

        <div className="flex-1" />

        <div className="w-[520px] max-w-[50%]">
          <input
            className="w-full rounded-md px-4 py-3 bg-gray-100 placeholder:text-gray-400"
            placeholder="Search experiences"
          />
        </div>

        <button className="ml-4 bg-yellow-400 px-4 py-2 rounded-md font-medium">
          Search
        </button>
      </div>
    </header>
  );
}
