export default () => (
    <>
        <p>博客地址：<a href="https://zhangbing.site" target="_blank">https://zhangbing.site</a></p>
        <button onClick={goHome}>返回首页</button>
    </>
)

function goHome() {
    location.href = 'http://localhost:3000/'
}
