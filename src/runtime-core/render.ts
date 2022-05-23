import { setupComponent } from "./component";
import { createComponentInstance } from "./component"

export function render(vnode,container){
    //path (方便递归处理)
    //
    path(vnode,container)
 }

 function path(vnode,container){
    //处理组件
    processComponent(vnode,container);
    //判断是不是元素类型(element)
 }

 function processComponent(vnode:any,container:any){
     //挂载组件
     mountComponent(vnode,container)
 }

 function mountComponent(vnode:any,container:any){
     //创建组件实例对象
   const instance= createComponentInstance(vnode);
   //调用setup
   setupComponent(instance)
   //调用render
   setuoRenderEffect(instance,container)
 }
function setuoRenderEffect(instance:any,container:any){
    //虚拟节点树（vnode 元素类型  mountElement）path 
    const subTree=instance.render();
    path(subTree,container)
}
