import logo from "../assets/general/logo.png";

export default function NavBar() {
  return (
    <nav className="relative flex items-center justify-between bg-[#222] shadow-[0_5px_15px_0_rgba(0,0,0,0.25)] text-[white] uppercase overflow-hidden w-full h-[10vh]">
      <img src={logo} alt="logo" className="w-auto h-[10vh] ml-2" />
      <ul className="flex list-none">
        <li className="px-4 cursor-pointer">
          <a
            className="relative flex items-center no-underline transition-all duration-[0.3s] ease-[ease-in-out] text-[white] hover:text-[#ea4f4c]"
            href=""
          >
            Home
          </a>
        </li>
        <li className="px-4 cursor-pointer">
          <a
            className="relative flex items-center no-underline transition-all duration-[0.3s] ease-[ease-in-out] text-[white] hover:text-[#ea4f4c]"
            href="/movies"
          >
            Movies
          </a>
        </li>
        <li className="px-4 cursor-pointer">
          <a
            className="relative flex items-center no-underline transition-all duration-[0.3s] ease-[ease-in-out] text-[white] hover:text-[#ea4f4c]"
            href=""
          >
            Cinemas
          </a>
        </li>
        <li className="px-4 cursor-pointer">
          <a
            className="relative flex items-center no-underline transition-all duration-[0.3s] ease-[ease-in-out] text-[white] hover:text-[#ea4f4c]"
            href=""
          >
            About
          </a>
        </li>
        <li className="px-4 cursor-pointer">
          <a
            className="relative flex items-center no-underline transition-all duration-[0.3s] ease-[ease-in-out] text-[white] hover:text-[#ea4f4c]"
            href=""
          >
            You
          </a>
        </li>
      </ul>
    </nav>
  );
}
