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
require('./less/index.less')

Object.keys(addons).forEach(addon=>Vpage.use(addons[addon]))

var page = new Vpage({loading:true,autoplay:true})

page.on('addon.loading.notice',function(){
    console.log(arguments)
})
// page.on('init',function(instance){
//     // console.log(ar)
// })

// console.dir(Vpage)
// console.dir(page)
