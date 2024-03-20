import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className="px-7">{children}</div>;
};

export default PageContainer;
