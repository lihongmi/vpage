/*!========================================================================
 * Version: v1.0
 * Create: 2016年4月9日 上午11:42
 * ========================================================================
 * Author: Vace (ocdo@qq.com)
 * Description: <Page 基类,继承 EventEmiter>
 * 1.根据config初始化Vpage实例
 * 2.所有回调事件通过 instance.on()
 * ======================================================================== */

/* global $,Hammer */

import EventEmitter from './libs/EventEmitter'

import {defaults,assign,type} from './utils'
import * as vpageConst from './const/vpage-const'

export default class Vpage extends EventEmitter{
    constructor(config = {}){
        super()
        this.config = assign({},defaults,config)
        this.status = vpageConst.STATUS_INIT
        this._current = this.$get('initialSlide',0)
        //查找需要缓存你用的节点
        this.$vbox = $('.v-box')
        this.$vloding = $('.v-loading')
        this.$vslides = $('.v-slide')
        //监听捕获其他插件触发的事件
        this.$_listening()
        //加载所有运行插件
        this.$addons()
        this.$init()
        this.$events()
    }

    /**
     * [c 读取config配置]
     * @return {[type]} [description]
     */
    $get(key,_def=undefined){
        return type(this.config[key]) === 'undefined' ?  _def : this.config[key]
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
        this.emit(vpageConst.EVENT_INIT,this)
    }

    $events(){

    }
    $addons(){
        var addons = Vpage._addons,addon
        for(var i = 0, _len = addons.length; i < _len ; i++){
            addon = addons[i]
            if(type(addon) === 'function'){
                addon(this,this.config)
            }
        }
    }
    $render(){

    }

    $start(){
        this.status = vpageConst.STATUS_START
        this.emit(vpageConst.EVENT_START)
    }
    //到下一页
    $next(e){
        console.log('next',e)
    }
    //翻页到上一页
    $prev(e){
        console.log('prev',e)
    }

    //事件监听
    $_listening(){
        this.once(vpageConst.EVENT_START_TRIGGER,this.$start)
        this.on(vpageConst.EVENT_TO_NEXT,this.$next)
        this.on(vpageConst.EVENT_TO_PREV,this.$prev)
    }

    /**
     * getter and setter
     */
    //应用是否已经开始
    get start(){
        return this.status === vpageConst.STATUS_START
    }

    //当前页码
    set current(index){
        this._current = index
        this.$render()
    }
    get current(){
        return this._current
    }
}

Vpage._addons = []
Vpage.use = function(addon){
    Vpage._addons.push(addon)
}
