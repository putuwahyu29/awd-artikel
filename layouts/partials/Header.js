import Logo from "@components/Logo";
import menu from "@config/menu/index.json";
import socical from "@config/social/index.json";
import Social from "@layouts/components/Social";
import ThemeSwitcher from "@layouts/components/ThemeSwitcher";
import SearchModal from "@partials/SearchModal";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearch, IoClose, IoMenu } from "react-icons/io5";

const Header = () => {
  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [searchModal, setSearchModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Router
  const router = useRouter();

  // stop scrolling when nav is open
  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);

  // auto close menu on route change
  useEffect(() => {
    setShowMenu(false);
  }, [router.asPath]);

  return (
    <header className="header">
      <nav className="navbar container px-1 sm:px-8">
        <div className="order-0">
          <Logo />
        </div>
        <div className="flex items-center space-x-4 xl:space-x-8">
          <div
            className={`collapse-menu ${
              !showMenu
                ? "translate-x-full invisible opacity-0 pointer-events-none"
                : "translate-x-0 visible opacity-100 pointer-events-auto"
            } lg:flex lg:translate-x-0 lg:visible lg:opacity-100 lg:pointer-events-auto`}
          >
            <button
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary dark:bg-darkmode-theme-dark dark:text-darkmode-light lg:hidden"
              onClick={() => setShowMenu(false)}
              aria-label="Tutup Menu"
            >
              <IoClose className="text-xl" />
            </button>
            <ul
              id="nav-menu"
              className="navbar-nav w-full md:w-auto md:space-x-1 lg:flex xl:space-x-2"
            >
              {main.map((menu, i) => (
                <React.Fragment key={`menu-${i}`}>
                  {menu.hasChildren ? (
                    <li className="nav-item nav-dropdown group relative">
                      <span
                        className={`nav-link ${
                          menu.children
                            .map((c) => c.url)
                            .includes(router.asPath) && "active"
                        } inline-flex items-center`}
                      >
                        {menu.name}
                        <svg
                          className="h-4 w-4 fill-current ml-1"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                      <ul className="nav-dropdown-list hidden transition-all duration-300 group-hover:top-[46px] group-hover:block md:invisible md:absolute md:top-[60px] md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                        {menu.children.map((child, i) => (
                          <li
                            className="nav-dropdown-item"
                            key={`children-${i}`}
                          >
                            <Link
                              href={child.url}
                              onClick={() => setShowMenu(false)}
                              className={`nav-dropdown-link block ${
                                router.asPath === child.url && "active"
                              }`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link
                        href={menu.url}
                        onClick={() => setShowMenu(false)}
                        className={`nav-link block ${
                          router.asPath === menu.url && "active"
                        }`}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
            {/* header social */}
            <Social source={socical} className="socials" />
          </div>

          <ThemeSwitcher />

          {/* Header search */}
          <div
            className="search-icon flex items-center justify-center cursor-pointer"
            onClick={() => {
              setSearchModal(true);
            }}
          >
            <IoSearch />
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform active:scale-95 lg:hidden"
            aria-label="Buka Menu"
          >
            {showMenu ? (
              <IoClose className="text-xl" />
            ) : (
              <IoMenu className="text-xl" />
            )}
          </button>
        </div>

        <SearchModal
          searchModal={searchModal}
          setSearchModal={setSearchModal}
        />
      </nav>

      {/* Mobile Drawer Backdrop */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="header-backdrop fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}
    </header>
  );
};

export default Header;
