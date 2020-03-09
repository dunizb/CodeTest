import {Avatar,Divider} from 'antd'
import '../public/styles/components/author.css'

const Author =()=>{
    return (
        <div className="author-div common-box">
            <div> <Avatar size={100} src="https://zhangbing.site/static/images/avatar.gif"  /></div>
            <div className="author-introduction">
                做工程不做码农(微信公众号同名)，Web前端工程师，7年开发经验，坐标杭州，聚焦大前端技术和程序员成长的公众号。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account"  />
                <Avatar size={28} icon="qq"  className="account" />
                <Avatar size={28} icon="wechat"  className="account"  />
            </div>
        </div>
    )

}

export default Author
