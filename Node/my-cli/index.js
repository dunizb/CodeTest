#! /usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();

const answerCallback = (answer) => {
  if (answer === "快乐") {
    console.log("听你这么说我很高兴");
    rl.close();
  } else if (answer === "悲伤") {
    console.log("希望你明天感觉好些");
    rl.close();
  } else {
    console.log("你是快乐还是悲伤？");
    rl.question("你今天好吗(快乐，悲伤)？ ", answerCallback);
  }
};

rl.question("你今天好吗(快乐，悲伤)？", answerCallback);
