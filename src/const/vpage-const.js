//应用实例化事件
export const EVENT_INIT = 'event.init'
//触发翻页应用开始事件
export const EVENT_START_TRIGGER = 'event.start.trigger'
//所有前置操作完成,进入到第一页
export const EVENT_START = 'event.start'
//切换到下一页之前,可以通过设置实例的canNext = false 组织下滑
export const EVENT_BEFORE_TO_NEXT = 'event.before.next'
//到下一页
export const EVENT_TO_NEXT = 'event.next'
//成功到达下一页后执行触发
export const EVENT_AFTER_TO_NEXT = 'event.after.next'
//切换到上一页之前,可以通过设置实例的canPrev = false 组织上滑
export const EVENT_BEFORE_TO_PREV = 'event.before.prev'
//到上一页
export const EVENT_TO_PREV = 'event.to.prev'
//成功到达上一页后执行触发
export const EVENT_AFTER_TO_PREV = 'event.after.prev'

//通知所有addon
export const EVENT_ADDON = 'event.addon'
//当实例被销毁
export const EVENT_DESTORY = 'event.destory'


//Vpage处于init状态
export const STATUS_INIT = 'status_init'
//Vpage处于start状态
export const STATUS_START = 'status_start'
//Vpage实例被销毁
export const STATUS_DESTORY = 'status_destory'
