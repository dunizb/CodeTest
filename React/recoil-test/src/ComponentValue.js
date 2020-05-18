import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { counterAtom } from "./Atoms";

export default function ComponentValue() {
  const counter = useRecoilValue(counterAtom);

  return (
    <div>
      <p>Component Value Only</p>
      <p>{counter}</p>
    </div>
  )
}
