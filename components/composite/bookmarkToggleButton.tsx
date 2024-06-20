"use client";

import { useState } from "react";
import { BookmarkIcon } from "@/icons";
import Button from "../basic/button";

// This should be done after server provides bookmark read api
export default function BookmarkToggleButton({ id, onClick } : { id: number, onClick? : (event: React.MouseEvent<HTMLElement, MouseEvent>) => void }) {

  const [b, setB] = useState(false);
  
  return <span className={b ? "text-primary-500" : "text-neutral-400 dark:text-neutral-600"}>
    <Button kind='blank' onClick={(e) => {
      onClick && (onClick(e));
      setB(!b)
    }}>
      <BookmarkIcon />
    </Button>
  </span>;
  
}