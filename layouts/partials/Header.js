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
  const { main } = menu;
  const [searchModal, setSearchModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  // Stop scrolling on body when nav drawer is open
  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);

  // Auto close menu on route change
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
          {/* Backdrop Overlay */}
          <div
            onClick={() => setShowMenu(false)}
            className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
              showMenu
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }`}
          />

          {/* Drawer Menu Container */}
          <div
            className={`fixed right-0 top-0 z-50 flex h-full w-[300px] max-w-[85vw] flex-col justify-between border-l border-border/40 bg-white/95 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out dark:border-darkmode-border/40 dark:bg-darkmode-body/95 lg:static lg:h-auto lg:w-auto lg:max-w-full lg:flex-row lg:items-center lg:border-l-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
              !showMenu
                ? "translate-x-full invisible opacity-0 pointer-events-none lg:visible lg:opacity-100 lg:pointer-events-auto lg:translate-x-0"
                : "translate-x-0 visible opacity-100 pointer-events-auto"
            }`}
          >
            {/* Mobile Drawer Top Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-darkmode-border/40 lg:hidden">
              <Logo />
              <button
                onClick={() => setShowMenu(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-primary/10 hover:text-primary dark:bg-darkmode-theme-dark dark:text-darkmode-light"
                aria-label="Tutup Menu"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Navigation Links */}
            <ul
              id="nav-menu"
              className="navbar-nav my-6 flex-1 space-y-2 lg:my-0 lg:flex lg:items-center lg:space-y-0 lg:space-x-1 xl:space-x-2"
            >
              {main.map((menuItem, i) => {
                const isActive = router.asPath === menuItem.url;
                return (
                  <li key={`menu-${i}`} className="nav-item mb-0">
                    <Link
                      href={menuItem.url}
                      onClick={() => setShowMenu(false)}
                      className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all lg:rounded-full lg:px-4 lg:py-2 ${
                        isActive
                          ? "bg-primary text-white shadow-md lg:bg-primary lg:text-white"
                          : "text-text hover:bg-primary/10 hover:text-primary dark:text-darkmode-light"
                      }`}
                    >
                      {menuItem.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Drawer Footer Social Links */}
            <div className="border-t border-gray-100 pt-4 dark:border-darkmode-border/40 lg:border-t-0 lg:pt-0">
              <Social
                source={socical}
                className="socials flex items-center justify-center space-x-3"
              />
            </div>
          </div>

          <ThemeSwitcher />

          {/* Search Icon */}
          <div
            className="search-icon flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-dark transition-all hover:bg-primary/10 hover:text-primary dark:bg-darkmode-theme-dark dark:text-darkmode-light"
            onClick={() => setSearchModal(true)}
          >
            <IoSearch className="text-lg" />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform active:scale-95 lg:hidden"
            aria-label="Buka Menu"
          >
            <IoMenu className="text-2xl" />
          </button>
        </div>

        <SearchModal
          searchModal={searchModal}
          setSearchModal={setSearchModal}
        />
      </nav>
    </header>
  );
};

export default Header;
