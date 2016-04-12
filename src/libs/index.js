/*========================================================================
 * Version: v1.0
 * Create: 2016年4月11日 上午10:39
 * ========================================================================
 * Author: Vace (ocdo@qq.com)
 * Description: <处理第三方扩展库,并且暴露到全局使用>
 * ======================================================================== */
import Hammer from './hammer'
require('./zepto')
// require('./promise').polyfill()

/**
 * [jQuery 使一些Jquery插件能够正常运行 -.-]
 * @type {[type]}
 */
window.jQuery = Zepto
window.Hammer = Hammer
// window.Zepto = Zepto
// window.$ === undefined && (window.$ = Zepto)


export {
    Hammer,$
}
