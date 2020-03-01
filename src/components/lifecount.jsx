import React from 'react'
import { DatePicker, Divider, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { recieveArticle } from '../redux/actions'
class Lifecount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            borntime: 0,
            deadtime: 0,
            sixfive: 0
        }
    }
    getime = () => {


    }
    dealtime = (borntime, deadtime, sixfive) => {
        let h = 1000 * 60 * 60;
        let d = 1000 * 60 * 60 * 24;
        let m = 1000 * 60 * 60 * 24 * 30;
        let y = 1000 * 60 * 60 * 24 * 365;
        let block = (deadtime - borntime) / 400;
        const now = Date.now()
        let twoeight = new Date(borntime).setFullYear(new Date(borntime).getFullYear() + 28)
            , foursix = new Date(borntime).setFullYear(new Date(borntime).getFullYear() + 46);
        let by = Math.round(((now - borntime) / y) * 10) / 10
        let bm = Math.round(((now - borntime) / m) * 10) / 10
        let bd = Math.round(((now - borntime) / d) * 10) / 10
        let dy = Math.round(((deadtime - now) / y) * 10) / 10
        let dm = Math.round(((deadtime - now) / m) * 10) / 10
        let dd = Math.round(((deadtime - now) / d) * 10) / 10
        let past = parseInt((now - borntime) / block) + 1;
        let sleep = parseInt((deadtime - now) / 3 / block) + 1;
        let work = parseInt((sixfive - now) / 3 / block) + 1;
        
        let childtime = foursix - twoeight
        if (new Date(now).getFullYear() - new Date(borntime).getFullYear() > 28) {

            childtime = foursix - now
            console.log(99)
        }
        let child = parseInt((childtime * 5 / 24) / block) + 1;
        let parents = parseInt((deadtime - now) / m * d / block) + 1;
        let surplus = 400 - (past + sleep + work + child + parents);
        //console.log((now-borntime)/block)
        //已经过了的人生小格
        //console.log((deadtime-now)/3/block)
        //余下人生的睡眠时间
        //console.log((sixfive-now)/3/block)
        //余生工作时间
        //console.log((18*y*5/24)/block)
        //花在孩子身上时间
        //console.log((deadtime-now)*d/m/block)
        //陪父母的时间
        return {
            time: [by, bm, bd, dy, dm, dd],
            block: {
                past,
                sleep,
                work,
                child,
                
                parents,
                surplus,
            }
        }
    }

    render() {
        let retired = 1;
        var sum = 0
        var arr = new Array();
        const deal = this.dealtime(this.state.borntime, this.state.deadtime, this.state.sixfive);
        const [y, m, d, dy, dm, dd] = deal.time
        var blocklist = deal.block
        console.log(deal.block)
        Object.getOwnPropertyNames(blocklist).map((key) => {
            console.log('blocks ' + key + '---' + blocklist[key])
            if (sum>400||blocklist[key] < 0) {
                return 0
            }
            
            let begin = sum
            let end = sum + blocklist[key]
            for (let i = begin; i < end; i++) {
                arr[i] = {
                    id: i,
                    class: 'blocks ' + key
                }
            }
            sum += blocklist[key];
        })
        if(arr[324]&&arr[324].class!='blocks past'){
            arr[324].class = 'blocks retired'
        }
        console.log(arr)
        if (this.state.borntime) {
            return (
                <div>
                    <DatePicker size='large'
                        onChange={(e) => {
                            if (e) {
                                let borntime = Date.parse(e._d);
                                let _bt = new Date(borntime)
                                let deadtime = _bt.setFullYear(_bt.getFullYear() + 80);
                                let sixfive = _bt.setFullYear(_bt.getFullYear() - 15);
                                this.setState({
                                    borntime: borntime,
                                    deadtime: deadtime,
                                    sixfive: sixfive
                                })
                            }
                        }} />
                    <Divider>已经过去了</Divider>
                    <Row className='pastime'>
                        <Col xs={{ span: 8 }} lg={{ span: 6, offset: 2 }}>
                            {`${y}`}<small>年</small>
                        </Col>
                        <Col xs={{ span: 8 }} lg={{ span: 6, offset: 2 }}>
                            {`${m}`}<small>月</small>
                        </Col>
                        <Col xs={{ span: 8 }} lg={{ span: 6, offset: 2 }}>
                            {`${d}`}<small>天</small>
                        </Col>
                    </Row>
                    <Divider>剩下的时间</Divider>
                    <Row className='pastime'>
                        <Col xs={{ span: 8 }} lg={{ span: 6, offset: 2 }}>
                            {`${dy}`}<small>年</small>
                        </Col>
                        <Col xs={{ span: 8 }} lg={{ span: 6, offset: 2 }}>
                            {`${dm}`}<small>月</small>
                        </Col>
                        <Col xs={{ span: 8 }} lg={{ span: 6, offset: 2 }}>
                            {`${dd}`}<small>天</small>
                        </Col>
                    </Row>
                    <Divider>你的人生进度</Divider>
                    <div className='lifebox'>
                        {arr.map((item) => {
                            return (<div className={item.class} key={item.id}></div>)
                        })}
                    </div>
                    <Divider>说明</Divider>
                    <ul className="discribe">
                        <li>参考了小程序 lifecount 而制作的网页版本 假设我们的寿命是80岁,分为400个方块。</li>
                        <li><div className='blockpast'></div>你已经走过的生命</li>
                        <li><div className='blocksleep'></div>如果你平均每天休息 8 小时，这是你余下生命里睡眠占用的时间</li>
                        <li><div className='blockwork'></div>如果你 65 岁退休，退休前平均每天工作 8 小时，这是你余下生命里工作占用的时间</li>
                        <li><div className='blockretired'></div>65 岁，你退休了</li>
                        <li><div className='blockchild'></div>如果你 28 岁生孩子，孩子18岁出门上大学，这 18 年里你平均每天能花 5 个小时陪伴孩子，这里是你余下生命里所用去的时间</li>
                        <li><div className='blockparents'></div>如果你每个月能看望父母一天，在他们 80 岁前，这是你的余生里还能陪伴他们的时光</li>
                        <li><div className='blocksurplus'></div>除了以上之外，你剩下的所有日子</li>
                        <li>数据仅供娱乐，人生苦短，继续努力吧~</li >
                    </ul>

                </div >)
        }
        return (
            <div>
                <DatePicker size='large' placeholder='输入你的出生日期'
                    onChange={(e) => {
                        if (e) {
                            let borntime = Date.parse(e._d);
                            let _bt = new Date(borntime)
                            let deadtime = _bt.setFullYear(_bt.getFullYear() + 80);
                            let sixfive = _bt.setFullYear(_bt.getFullYear() - 15);
                            this.setState({
                                borntime: borntime,
                                deadtime: deadtime,
                                sixfive: sixfive
                            })
                        }

                    }} 
                    disabledDate={current=>{
                        let today = Date.now()
                        let _start = new Date()
                        let start = _start.setFullYear(_start.getFullYear() - 78);
                        return current&&(Date.parse(current._d)<start||Date.parse(current._d)>today)
                    }}/>

            </div>)
    }
}
export default Lifecount
