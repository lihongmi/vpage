插件目录.

一些特效组件通过组件的方式实现

# 插件实现机制
所有插件为一个函数,`installAddon(vpageinstance)`

内部通过监听一些事件,完成插件操作,所有事件回调当前实例以及用户配置`instance,config`
