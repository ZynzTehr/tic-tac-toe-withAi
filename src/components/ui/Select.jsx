import React from "react";
export function Select({ value, onChange, children }) {
  return <select value={value} onChange={e=>onChange(e.target.value)} className="px-3 py-2 border rounded-xl">{children}</select>;
}
export function Option({ value, children }) { return <option value={value}>{children}</option>; }
