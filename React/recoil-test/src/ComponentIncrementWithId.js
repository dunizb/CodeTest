import React from "react";
import { counterWithId } from "./Atoms";
import { useRecoilState } from "recoil";

export default function ComponentIncrementWithId(props) {
  const [counter, setCounter] = useRecoilState(counterWithId(props.id));

  function onIncrementClick() {
    setCounter((current) => current + 1);
  }
  return (
    <div>
      <p>Component 1</p>
      <p>{counter}</p>
      <input onClick={onIncrementClick} type="submit" value="Increment" />
    </div>
  )
}
