import React from 'react';
import ShowArea from './ShowArea';
import Buttons from './Buttons';
import {Color} from './color'

function Example3(){
    return (
        <div>
            <h3>useReducer代替Redux小案例</h3>
            <Color>
                <Buttons />
                <ShowArea />
            </Color>
        </div>
    )
}

export default Example3;
