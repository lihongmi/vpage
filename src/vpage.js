/*!========================================================================
 * Version: v1.0
 * Create: 2016年4月9日 上午11:42
 * ========================================================================
 * Author: Vace (ocdo@qq.com)
 * Description: <Page 基类,继承 EventEmiter>
 * 1.根据config初始化Vpage实例
 * 2.所有回调事件通过 instance.on()
 * ======================================================================== */

import EventEmitter from './lib/EventEmitter'
import assign from './utils/assign'
import defaults from './utils/defaults'
import type from './utils/type'

export default class Vpage extends EventEmitter{
    constructor(config = {}){
        super()
        this.config = assign({},defaults,config)
        this.$init()

    }
    /**
     * [c 读取config配置]
     * @return {[type]} [description]
     */
    $get(key,_def=undefined){
        return this.config[key] || _def
    }
    /**
     * [$set 设置默认配置项]
     * @param {[type]} key   [设置属性]
     * @param {[type]} value [设置值]
     * @param {[type]} cover=true [是否覆盖默认设置]
     */
    $set(key,value,cover = true){
        this.config[key] = cover ? value : (type(this.config[key]) === 'undefined' ? value : this.config[key] )
    }

    /**
     * [$init 初始化]
     * @return {[type]} [description]
     */
    $init(){
        
    }
    $loading(){

    }
    $events(){

    }
}


Vpage._default = {

}
