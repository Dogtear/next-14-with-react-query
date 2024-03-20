import PageContainer from "@/components/common/PageContainer";
import { ReactQueryProviders } from "@/providers/react-query/react-query-providers";
import { NextPage } from "next";
import React from "react";

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const HomePageLayout: NextPage<HomePageLayoutProps> = ({ children }) => {
  return (
    <div>
      <ReactQueryProviders>
        <PageContainer>{children}</PageContainer>
      </ReactQueryProviders>
    </div>
  );
};

export default HomePageLayout;
