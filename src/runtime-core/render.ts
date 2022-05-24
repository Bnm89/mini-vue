import { setupComponent } from "./component";
import { createComponentInstance } from "./component"

export function render(vnode,container){
    //path (方便递归处理)
    //
    path(vnode,container)
 }

 function path(vnode,container){
      //判断是不是元素类型(element)
   
    //处理组件 如何区分element还是component 类型
    if(vnode.type=='string'){
      processElement(vnode ,container)
    }else if(vnode.tyoe=='object'){
      processComponent(vnode,container);
    }
    
   
 }
function processElement(vnode:any,container:any){
  mountElement(vnode,container)
    
}
function mountElement(vnode:any,container:any){
  const el=document.createElement(vnode.type);
  const {children,props} =vnode;
  //处理children
  if(typeof children=='string'){
    el.textContent=children;
  }else if(Array.isArray(children)){
    mountChidren(vnode,el)
  }
  
  for(const key in props){
    const val=props[key];
    el.setAtteribute(key,val)
  }
  container.append(el)
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
    const {proxy}=instance
    const subTree=instance.render.call(proxy);
    path(subTree,container)
}

function mountChidren(vnode:any,container:any){
       vnode.children.forEach(function(v){
         path(v,container)
       })
}
