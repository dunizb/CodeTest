import React from "react";
import { useRecoilValue } from "recoil";
import { counterWithId } from "./Atoms";

export default function ComponentValueWithId(props) {
  const counter = useRecoilValue(counterWithId(props.id));

  return (
    <div>
      <p>Component Value Only</p>
      <p>{counter}</p>
    </div>
  )
}
