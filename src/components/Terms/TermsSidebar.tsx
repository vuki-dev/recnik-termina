import style from "./TermsSidebar.module.css";
import { useRef, useState } from "react";
import AddTerm from "./CRUD/AddTerm";

export default function TermsSidebar() {
  
  return (
    <aside className={`${style.aside}`}>
      <AddTerm/>
    </aside>
  );
}
