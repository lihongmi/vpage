/*========================================================================
 * Version: v1.0
 * Create: 2016年4月12日 上午9:15
 * ========================================================================
 * Author: Vace (ocdo@qq.com)
 * Description: <手势控制插件>
 * 左右 swipeleft,swiperight,上下swipeup,swipedown
 * ======================================================================== */
import {assign} from '../utils/index'
import * as vpageConst from '../const/vpage-const'
import Hammer from '../libs/hammer'

const _def = {
    // direction:DIRECTION_VERI,
    //Minimal distance required before recognizing.
    threshold:10,
    //Minimal velocity required before recognizing, unit is in px per ms.
    velocity:0.3
}

export default function(instance,config){
    var conf = config.gesture
    if(!conf) return;
    //移动方向为page实例传来的
    _def.direction = config.direction

    conf = assign({},conf,_def)

    var onNext = (e) => instance.emit(vpageConst.EVENT_TO_NEXT,e),
        onPrev = (e) => instance.emit(vpageConst.EVENT_TO_PREV,e),
        contrl,
        event_next_type,
        event_prev_type

    instance.once(vpageConst.EVENT_INIT,()=>{
        //绑定事件
        var boxel = instance.$vbox.get(0)
        contrl = new Hammer(boxel,{
            threshold:conf.threshold,
            velocity:conf.velocity
        })

        if(conf.direction === vpageConst.DIRECTION_VERTICAL){
            //监听下拉事件
            contrl.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL })
            event_next_type = 'swipeup'
            event_prev_type = 'swipedown'

        }else{
            event_next_type = 'swipeleft'
            event_prev_type = 'swiperight'
        }

        contrl.on(event_next_type,onNext)
        contrl.on(event_prev_type,onPrev)
    })

    instance.once(vpageConst.EVENT_DESTORY,()=>{
        if(contrl){
            contrl.off(event_next_type,onNext)
            contrl.off(event_prev_type,onPrev)
        }
    })
}
