import { setupComponent } from "./component";
import { createComponentInstance } from "./component"
import { creatAppApi } from "./createApp";
import { createVNode } from "./vnode";
export function createRenderer(option){
  const {
    createElement,
    pathProp,
    insert,
  }=option

function render(vnode,container,parentComponent){
    //path (方便递归处理)
    //
    path(vnode,container,parentComponent)


 function path(vnode,container,parentComponent){
      //判断是不是元素类型(element)
   
    //处理组件 如何区分element还是component 类型
    if(vnode.type=='string'){
      processElement(vnode ,container)
    }else if(vnode.tyoe=='object'){
      processComponent(vnode,container,parentComponent);
    }
    
   
 }
function processElement(vnode:any,container:any){
  mountElement(vnode,container)
    
}
function mountElement(vnode:any,container:any){
  const el=vnode.el=createElement(vnode.type)           //document.createElement(vnode.type);
  const {children,props} =vnode;
  //处理children
  if(typeof children=='string'){
    el.textContent=children;
  }else if(Array.isArray(children)){
    mountChidren(vnode,el)
  }
  
  for(const key in props){
    const val=props[key];

    // const isOn=(key:string)=>/^on[A-Z]/.test(key);
    // if(isOn(key)){
    //   const event=key.slice(2).toLocaleLowerCase();
    //   el.addEventListener(event,key)
    // }else{
    //   el.setAtteribute(key,val)
    // }
   pathProp(el,key,val)
  }
  // container.append(el)
  insert(el,container)
}
 function processComponent(vnode:any,container:any,parentComponent:any){
     //挂载组件
     mountComponent(vnode,container,parentComponent)
 }

 function mountComponent(vnode:any,container:any,parentComponent:any){
     //创建组件实例对象
   const instance= createComponentInstance(vnode,parentComponent);
   //调用setup
   setupComponent(instance)
   //调用render
   setuoRenderEffect(instance,container,vnode)
 }
function setuoRenderEffect(instance:any,container:any,vnode:any){
    //虚拟节点树（vnode 元素类型  mountElement）path 
    const {proxy}=instance
    const subTree=instance.render.call(proxy);
    path(subTree,container,instance);
    vnode.el= subTree.el
}

function mountChidren(vnode:any,container:any){
       vnode.children.forEach(function(v){
         path(v,container,'')
       })
}
 }
 return {
   creatApp:creatAppApi(render)
 }
}

