/* global $ */

/*!========================================================================
 * Version: v1.0
 * Create: 2016年4月11日 上午11:42
 * ========================================================================
 * Author: Vace (ocdo@qq.com)
 * Description: <图片懒加载,所有的img元素 加载 data-src="imgsrc">
 * 1.加载所在 class='v-lazy' 的图片,并且回调进度 onLazyCallback(currunt,total)
 * 2.优化首屏加载,控制loading,默认关闭,如果需要开启设置class=v-lazy-first
 * 3.按需加载,加载当前页
 *
 * 需要配置 loading: {
 * 	selector:'.v-lazy',//加载类
 * 	first:'.v-lazy-first',
 * },
 * default:data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
 *
 * 对外提供事件
 * 1.addon.loading.notice(current,total,img) 每次加载的通知
 * 2.addon.loading.success(successnumber,total) lazy全部处理完的通知
 * 3.addon.loading.error(current,src,img) lazy加载出错的通知
 * ======================================================================== */
import {assign} from '../utils/index'

const _def = {
    //需要loading的类
    selector:'.v-lazy',
    //默认loading图片
    placeholder:'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    //图片显示效果
    effect:'fade',
    //data-src标识源
    dataAttribute:'src',
    //标识图片根目录
    baseUrl:''
}

var event_notice = 'addon.loading.notice',
    event_success = 'addon.loading.success',
    event_error = 'addon.loading.error'

/**
 * [function loading控制器]
 * @param  {[当前vpgae实例]} instance [description]
 * @return {[type]}          [description]
 */
export default function(instance,config){
    var conf = config.loading
    //是否开启loadIng
    if(!conf) return;

    conf = assign({},conf,_def)

    //lazy加载的全部加载完成,移除loading
    instance.once(event_success,()=>{
        $('body').addClass('v-loaded')
    })
    /**
     * [once 应用开始的时候加载需要lazy加载的图片]
     * @param  {[type]} 'init'          [description]
     * @param  {[type]} function(config [description]
     * @return {[type]}                 [description]
     */
    instance.once('init',function(config){
        const lazys = $(conf.selector)
        var total = lazys.length,
            loaded = 0,
            error = 0,
            check_complete = function(){
                if(loaded === total){
                    instance.emit(event_success,total - error,total)
                    return true
                }
                return false
            }
        lazys.attr('src',conf.placeholder)
        //预先检查,可能存在所有图片不需要lazy的情况
        check_complete()
        lazys.each((_ind,_el)=>{
            var $el = $(_el),
                src = conf.baseUrl + $el.data(conf.dataAttribute),
                img = new Image()
            img.onload = ()=>{
                loaded += 1
                instance.emit(event_notice,loaded,total,img)
                check_complete()
            }
            img.onerror = ()=>{
                console.warn(src + '不存在')
                loaded += 1
                instance.emit(event_error,loaded,total,img)
                check_complete()
            }
            img.src = src
        })

        // console.log(lazys)
    })
}
