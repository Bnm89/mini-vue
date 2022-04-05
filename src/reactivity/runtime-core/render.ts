
 import {createComponentInstance,setupComponent} from './component'
 
 export function render(vnode,container){
  //patch
  patch(vnode,container)
}


function patch(vnode,container){
     //处理组件
     //判断是不是element元素类型
     processComponent(vnode,container)   
}
function processComponent(vnode:any,container:any){
  //挂载组件
  mountComponent(vnode,container)
}
function mountComponent(vnode:any,container:any){
//创建组件实例
  const instance= createComponentInstance(vnode)
 //调用setup
 setupComponent(instance)
 setupRenderEffect(instance,container)
}
function setupRenderEffect(instance:any,container:any){
  const subTree=instance.render()
  //虚拟节点树
  patch(subTree,container)
}
