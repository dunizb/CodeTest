import React, { useState } from 'react';


function ExampleHook2(){
    const [userName, setUserName] = useState('张三');
    const [gender, setGender] = useState('男');
    const [work, setWork] = useState('React Dev');
    return (
        <div>
            <h3>计数器 useState 多状态声明</h3>
            <p>姓名：{userName}，性别：{gender}，工作：{work}</p>
            <button onClick={() => changeUser(setUserName, setGender, setWork)}>Change</button>
        </div>
    );
}

// ?
function changeUser(setUserName, setGender, setWork){
    setUserName('小花')
    setGender('女')
    setWork('护士')
}
 
export default ExampleHook2;
