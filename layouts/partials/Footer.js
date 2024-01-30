import config from "@config/config.json";
import menu from "@config/menu.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="section relative mt-8 bg-slate-100 pb-[50px] pt-[50px] dark:bg-dark">
      <div className="container text-center">
        <div className="mb-6 inline-flex">
          <Logo />
        </div>
        {markdownify(footer_content, "p", "max-w-[638px] mx-auto")}

        {/* footer menu */}
        <ul className="mb-12 mt-6 flex-wrap space-x-2 lg:space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block" key={menu.name}>
              <Link
                href={menu.url}
                className="p-2 font-bold text-dark hover:text-primary dark:text-darkmode-light lg:p-4"
                target={menu.blank ? "_blank" : ""}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* copyright */}
        {markdownify(
          `Copyright &copy; 2023 - ${new Date().getFullYear()} ${copyright}`,
          "p"
        )}
      </div>
    </footer>
  );
};

export default Footer;
