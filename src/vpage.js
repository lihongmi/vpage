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
        this.$_beforeRuning()
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
    /**
     * [$render 渲染从last场景切换到to场景]
     * @param  {[type]} to   [要切换到的场景]
     * @param  {[type]} last [上一个场景]
     * @return {[type]}      [description]
     */
    $render(to,last = -1){
        //其他插件阻止了
        if(!this.start){
            return false
        }
        var $to,$last
        //给当前页加上`v-active`
        $to = this.$vslides.eq(to).addClass('v-active')

        this.emit(vpageConst.EVENT_PAGE_IN,$to)
        if(last !== -1){
            $last = this.$vslides.eq(last).removeClass('v-active')
            this.emit(vpageConst.EVENT_PAGE_IN,$to)
        }
        this.current = to
    }

    $start(){
        this.status = vpageConst.STATUS_START
        this.emit(vpageConst.EVENT_START)
        this.$render(0)
    }
    //到下一页
    $next(e){
        this.emit(vpageConst.EVENT_BEFORE_TO_NEXT,this)
        this.$render(this.current + 1,this.current)
        this.emit(vpageConst.EVENT_AFTER_TO_NEXT,this)
    }
    //翻页到上一页
    $prev(e){
        //阻止前往下一页
        this.emit(vpageConst.EVENT_BEFORE_TO_PREV,this)
        this.$render(this.current - 1,this.current)
        this.emit(vpageConst.EVENT_AFTER_TO_PREV,this)
    }
    //运行之前,初始化一些东西
    $_beforeRuning(){
        this.status = vpageConst.STATUS_INIT
        //当前运行的节点
        this._current = this.$get('initialSlide',0)
        //查找需要缓存你用的节点
        this.$vbox = $('.v-box')
        this.$pages = this.$vbox.find('.v-pages')
        this.$vloding = this.$vbox.find('.v-loading')
        this.$vslides = this.$vbox.find('.v-slide')
        //当前总页数
        this._total = this.$vslides.length
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
    }
    get current(){
        return this._current
    }
}

Vpage._addons = []
Vpage.use = function(addon){
    Vpage._addons.push(addon)
}
