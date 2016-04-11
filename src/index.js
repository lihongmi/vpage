/*!========================================================================
 * Version: v1.0
 * Create: 2016年4月9日 上午11:38
 * ========================================================================
 * Author: Vace (ocdo@qq.com)
 * Description: <入口文件>
 * ======================================================================== */

import Vpage from './vpage'

require('./less/index.less')


var page = new Vpage({d:1,autoplay:true})

page.on('init',function(){
    console.log('ok')
})

console.dir(page)
