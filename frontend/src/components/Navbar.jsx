import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="navbar bg-base-200 border-b border-base-300 px-6">
      <div className="flex-1 gap-2">
        <img
          src="https://img.icons8.com/?size=512&id=23264&format=png"
          alt="logo"
          className="w-8 h-8 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <span
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          NotesApp
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm m-1">
            Theme
            <svg
              width="12"
              height="12"
              className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
          >
            {[
              "light",
              "dark",
              "retro",
              "cyberpunk",
              "valentine",
              "aqua",
            ].map((theme) => (
              <li key={theme}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label={theme}
                  value={theme}
                />
              </li>
            ))}
          </ul>
        </div>

        {token && (
          <button
            className="btn btn-sm btn-error"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
