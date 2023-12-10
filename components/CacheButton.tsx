"use client";
import revalidateCache from "@/utils/api";
import { Button } from "./ui/button";
import { CacheTag } from "@/types/cacheTags";

type CacheButtonProps = {
  tag: CacheTag;
  children: React.ReactNode;
};

const CacheButton = ({ tag, children }: CacheButtonProps) => {
  const handleClick = async () => {
    await revalidateCache(tag);
  };
  return <Button onClick={handleClick}>{children}</Button>;
};

export default CacheButton;
