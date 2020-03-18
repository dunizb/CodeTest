if (document.body.animate) {
  // 如果支持，我们在按钮上添加一个点击监听器
  document.querySelector("#button").addEventListener("click", pop);
}

// 每次点击都会调用 pop() 函数
function pop(e) {
  // 循环一次生成30个粒子
  for (let i = 0; i < 30; i++) {
    // 我们将鼠标坐标传递给 createParticle() 函数
    createParticle(e.clientX, e.clientY);
  }
}

function createParticle(x, y) {
  // 创建自定义粒子元素
  const particle = document.createElement("particle");
  // 将元素添加道body中
  document.body.appendChild(particle);
  // 计算从5px到25px的随机大小
  const size = Math.floor(Math.random() * 20 + 5);
  // 将大小应用于每个粒子
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  // 在蓝色/紫色调色板中生成随机颜色
  particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
  // 在距离鼠标75像素的范围内生成随机的x和y目标
  const destinationX = x + (Math.random() - 0.5) * 2 * 75;
  const destinationY = y + (Math.random() - 0.5) * 2 * 75;

  // 将动画存储在变量中，因为稍后我们将需要它
  const animation = particle.animate(
    [
      {
        // 设置粒子的原点位置
        // 我们将粒子偏移一半大小，以使其围绕鼠标居中
        transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
        opacity: 1
      },
      {
        // 我们将最终坐标定义为第二个关键帧
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0
      }
    ],
    {
      // 将随机持续时间设置为500到1500ms
      duration: 500 + Math.random() * 1000,
      easing: "cubic-bezier(0, .9, .57, 1)",
      // 将每个粒子延迟从0ms到200ms的随机值
      delay: Math.random() * 200
    }
  );
  // 动画结束后，从DOM中删除元素
  animation.onfinish = () => {
    particle.remove();
  };
}
