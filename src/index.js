/*!========================================================================
 * Version: v1.0
 * Create: 2016年4月9日 上午11:38
 * ========================================================================
 * Author: Vace (ocdo@qq.com)
 * Description: <入口文件>
 * ======================================================================== */
import * as libs from './libs/'
import Vpage from './vpage'
import * as addons from './addons'
import * as vpageConst from './const/vpage-const'
import assign from './utils/assign'

require('./less/index.less')

/**
 * Vpage常量
 */
assign(Vpage,vpageConst)

/**
 *  安装系统级别插件
 */
Object.keys(addons).forEach(addon=>Vpage.use(addons[addon]))

var page = new Vpage({
    loading:true,
    autoplay:true,
    gesture:true
})

page.on('addon.loading.notice',function(){
    console.log(arguments)
})

console.log(page)
// page.on('init',function(instance){
//     // console.log(ar)
// })

// console.dir(Vpage)
// console.dir(page)
