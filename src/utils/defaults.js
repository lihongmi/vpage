import * as vpageConst from '../const/vpage-const'

const config = {
    //翻页方式 horizontal vertical
    direction:vpageConst.DIRECTION_VERTICAL,
    //初始slide ID
    initialSlide:0,
    //是否自动播放,自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
    autoplay:false,
    //播放速度
    speed:3000,
    //是否循环,从最后一P可以滑动到第一P
    loop:false,
    //是否启用喵点路由控制
    hashnav:false,
    //是否加入分页选项
    pagination:false

}

export default config
