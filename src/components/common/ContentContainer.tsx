import { cn } from "@/lib/utils";
import React from "react";

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className,
}) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export default ContentContainer;
