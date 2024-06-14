"use client";

import { apiBookmark } from "@/api/search";
import { BookmarkIcon } from "@/icons";
import Button from "../basic/button";

import { useState } from "react";

export default function BookmarkToggleButton({ id } : { id: number }) {

  const [b, setB] = useState(false);
  
  return <span className={b ? "text-primary-500" : "text-neutral-400 dark:text-neutral-600"}>
    <Button kind='blank' onClick={() => setB(!b)}>
      <BookmarkIcon width="1.5rem" height="1.5rem" className="" />
    </Button>
  </span>;
  
}