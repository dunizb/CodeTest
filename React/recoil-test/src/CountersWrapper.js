import React from "react";
import ComponentIncrementWithId from "./ComponentIncrementWithId";
import ComponentValueWithId from "./ComponentValueWithId";

export default function CountersWrapper(props) {
  return (
    <div>
      <h2>Wrapper with id {props.id}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ComponentIncrementWithId id={props.id} />
        <ComponentValueWithId id={props.id} />
      </div>
    </div>
  )
}
