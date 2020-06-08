import React from "react";
import useSWR from "swr";
import { convert } from "./utils/currency";

export default function App() {
  const [base, dest] = ["USD", "CAD"];
  const { data: rate, error } = useSWR([base, dest], convert);

  if (error) return <span>"Error!"</span>;
  if (!rate) return <span>"Loading!"</span>;

  return (
    <div>
      {base} to {dest} = {rate}
    </div>
  );
}
