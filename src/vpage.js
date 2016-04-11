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

export default class Vpage extends EventEmitter{
    constructor(config = {}){
        super()
        this.config = assign({},defaults,config)
        this.$init()
        this.$events()
        this.$addons()
    }
    set current(index){
        this.current = index
        this.$render()
    }
    get current(){
        return this.current
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

    $events(){

    }
    $addons(){
        var addons = Vpage._addons,addon
        for(var i = 0, _len = addons;i < _len;i++){
            addon = addons[i]
            if(type(addon) === 'function'){
                addons[i](this,this.config)
            }
        }
    }
    $render(){

    }
}

Vpage._addons = []
Vpage.use = function(addon){
    Vpage._addons.push(addon)
}
