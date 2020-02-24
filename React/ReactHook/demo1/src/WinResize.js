import React, {useState, useCallback, useEffect} from 'react';

function useWindowResize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return size
}


function WinResize(){
    const size = useWindowResize()
    return (
        <>
            <h3>自定义Hook</h3>
            <p>请控制浏览器窗口</p>
            当前页面size：{size.width} x {size.height}
        </>
    )
}

export default WinResize
