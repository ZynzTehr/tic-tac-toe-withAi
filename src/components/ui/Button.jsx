import React from "react";
export default function Button({ children, variant='default', ...props }) {
  const base = "px-4 py-2 rounded-xl shadow-sm focus:outline-none";
  const v = variant === 'outline' ? "border bg-white" : variant==='ghost' ? "bg-transparent" : "bg-indigo-600 text-white";
  return <button className={base + " " + v} {...props}>{children}</button>;
}
