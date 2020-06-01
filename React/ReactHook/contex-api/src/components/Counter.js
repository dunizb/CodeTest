import React, { useContext } from "react"
import Context from "../context"
export default function Counter() {
  const myContext = useContext(Context);
  return <p>Counter: {myContext.counter}</p>
}
