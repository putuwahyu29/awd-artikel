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
      <nav className="navbar container px-3 sm:px-8">
        <div className="order-0">
          <Logo />
        </div>
        <div className="flex items-center space-x-3 xl:space-x-8">
          <div
            className={`collapse-menu ${
              !showMenu
                ? "translate-x-full invisible opacity-0 pointer-events-none"
                : "translate-x-0 visible opacity-100 pointer-events-auto"
            } lg:flex lg:translate-x-0 lg:visible lg:opacity-100 lg:pointer-events-auto`}
          >
            {/* Mobile Drawer Top Header Bar */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-darkmode-border/40 lg:hidden">
              <Logo />
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary dark:bg-darkmode-theme-dark dark:text-darkmode-light"
                onClick={() => setShowMenu(false)}
                aria-label="Tutup Menu"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Navigation Menu Links */}
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

            {/* Mobile Drawer Social Footer */}
            <div className="border-t border-gray-100 pt-4 dark:border-darkmode-border/40 lg:border-t-0 lg:pt-0">
              <Social source={socical} className="socials flex items-center justify-center space-x-3" />
            </div>
          </div>

          <ThemeSwitcher />

          {/* Header search with Cmd+K badge */}
          <button
            type="button"
            className="flex items-center space-x-2 rounded-full border border-border/60 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-all hover:border-primary/40 hover:bg-gray-100 hover:text-primary dark:border-darkmode-border/60 dark:bg-darkmode-theme-dark/50 dark:text-darkmode-light/80 dark:hover:bg-darkmode-theme-dark"
            onClick={() => setSearchModal(true)}
            aria-label="Cari Artikel (Ctrl+K)"
          >
            <IoSearch className="text-sm" />
            <span className="hidden md:inline">Cari...</span>
            <kbd className="hidden rounded bg-gray-200/80 px-1.5 py-0.5 text-[10px] font-bold text-gray-500 dark:bg-darkmode-border dark:text-darkmode-light/70 sm:inline-block">
              ⌘K
            </kbd>
          </button>

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

      {/* Mobile Drawer Backdrop Overlay */}
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
