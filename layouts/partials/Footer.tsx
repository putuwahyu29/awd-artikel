import React from "react";
import config from "@config/index.json";
import menu from "@config/menu/index.json";
import social from "@config/social/index.json";
import Logo from "@layouts/components/Logo";
import Social from "@layouts/components/Social";
import Link from "next/link";

const Footer: React.FC = () => {
  const { copyright, footer_content } = config.params;

  return (
    <footer className="relative mt-20 border-t border-slate-200/80 bg-slate-50/80 pt-14 pb-8 dark:border-slate-800/80 dark:bg-slate-900/90 backdrop-blur-xl">
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 pb-10 border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Col 1: Brand & Description */}
          <div className="lg:col-span-5">
            <div className="mb-4 inline-block">
              <Logo />
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-md">
              {footer_content ||
                "Portal publikasi dan artikel teknologi seputar sistem operasi Linux, DevOps, pengembangan web, serta eksplorasi teknologi terbaru."}
            </p>
            <div className="mt-5">
              <Social source={social} className="socials flex items-center space-x-2" />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 sm:col-span-6">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {menu.footer.map((menuItem) => (
                <li key={menuItem.name}>
                  <Link
                    href={menuItem.url}
                    className="text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                    target={menuItem.blank ? "_blank" : "_self"}
                  >
                    {menuItem.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://awd.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                >
                  Portofolio Penulis ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="lg:col-span-4 sm:col-span-6">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Topik Kategori
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link
                  href="/categories/linux"
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                >
                  Linux & System Administration
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/devops"
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                >
                  DevOps, Docker & Cloud
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/web-development"
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/open-source"
                  className="text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                >
                  Aplikasi Open Source
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div>
            Hak Cipta &copy; {new Date().getFullYear()} {copyright}. Seluruh Hak Cipta Dilindungi.
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            Awd Artikel • Blog Resmi awd.my.id
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
