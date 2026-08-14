import React from "react";

interface TabProps {
  name?: string;
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <li className="tab-item my-0 hidden">{children}</li>;
};

export default Tab;
