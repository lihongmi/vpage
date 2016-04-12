/*========================================================================
 * Version: v1.0
 * Create: 2016年4月12日 上午11:42
 * ========================================================================
 * Author: Vace (ocdo@qq.com)
 * Description: <翻页动画控制>
 * 控制方式,全局翻页通过控制
 * 全局配置属性 in,和out也可以
 * .v-pages 的 data-in,和data-out 控制
 * 每一页的翻页动画通过控制
 * .v-slide 的 data-in,和data-out 控制
 * 翻页可以设置 动画名称.延迟时间.top属性控制当前层级的动画,如
 * data-in="flipInRight.200" 表示flipInRight动画在200ms后运行
 * data-out="flipOutBottom.200.top" 表示flipOutBottom动画在200ms后运行,并且设置z-index未较高优先级
 * ======================================================================== */


import {assign} from '../utils/index'
import * as vpageConst from '../const/vpage-const'



export default function(instance,config){
    console.log(instance)
    var $pages = instance.$pages

    var inEffect = config.in || $pages.data('in') ,
        outEffect = config.out || $pages.data('out')
        // defaults = config.direction === vpageConst.DIRECTION_VERTICAL ? {
        //     in:
        // }

    function _getEffect($el,type = 'in'){

    }
    //页面进入
    instance.on(vpageConst.EVENT_PAGE_IN,($el)=>{
        _getEffect($el)
    })
    instance.on(vpageConst.EVENT_PAGE_OUT,($el)=>{
        _getEffect($el,'out')
    })
}
