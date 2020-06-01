import React, { useContext } from "react"
import Context from "../context"
export default function CounterTitle() {
  const myContext = useContext(Context);
  return <h1>{myContext.title}</h1>;
}
