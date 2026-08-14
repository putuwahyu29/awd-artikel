"use client";

import React, { useEffect, useRef } from "react";

interface TabsProps {
  children: React.ReactElement[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const tabItemsRef = useRef<HTMLUListElement>(null);

  const handleChangTab = (event: React.MouseEvent<HTMLLIElement>, index: number) => {
    if (!tabItemsRef.current || !event.currentTarget.parentElement) return;
    const tabLinks = Array.from(event.currentTarget.parentElement.children);
    const items = Array.from(tabItemsRef.current.children);
    const activeItem = items.find((item) => !item.classList.contains("hidden"));
    const activeTabLink = tabLinks.find((item) =>
      item.classList.contains("active-tab")
    );
    if (activeItem === items[index]) return;
    if (activeTabLink) activeTabLink.classList.remove("active-tab");
    event.currentTarget.classList.add("active-tab");
    if (activeItem) activeItem.classList.add("hidden");
    if (items[index]) items[index].classList.remove("hidden");
  };

  useEffect(() => {
    if (tabItemsRef.current && tabItemsRef.current.children.length > 0) {
      const allItems = Array.from(tabItemsRef.current.children);
      allItems[0]?.classList.remove("hidden");
    }
  }, []);

  const childList = React.Children.toArray(children) as React.ReactElement[];

  return (
    <div className="relative">
      <ul className="mb-0 flex list-none items-center space-x-4 pl-0">
        {childList.map((item: any, index: number) => (
          <li
            key={index}
            className={` m-0 cursor-pointer rounded px-8 py-3 font-bold text-dark dark:text-darkmode-light ${
              index === 0 ? "active-tab" : ""
            }`}
            onClick={(e) => handleChangTab(e, index)}
          >
            {item?.props?.name}
          </li>
        ))}
      </ul>
      <ul
        className="mt-1 mb-0 list-none rounded bg-theme-light p-6 dark:bg-darkmode-theme-dark"
        ref={tabItemsRef}
      >
        {children}
      </ul>
    </div>
  );
};

export default Tabs;
