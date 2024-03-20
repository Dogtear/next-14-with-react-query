import ContentContainer from "@/components/common/ContentContainer";
import { NextPage } from "next";
import React from "react";
import TaskContainer from "./_components/TaskContainer";

const HomePage: NextPage = () => {
  return (
    <ContentContainer className="px-48">
      <TaskContainer />
    </ContentContainer>
  );
};

export default HomePage;
