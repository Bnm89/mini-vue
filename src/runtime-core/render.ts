import { effect } from "../reactivity/effect";
import { setupComponent } from "./component";
import { createComponentInstance } from "./component"
import { creatAppApi } from "./createApp";
import { createVNode } from "./vnode";
import {Fragment,Text} from './vnode'
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

//n1代表老的虚拟节点 n2代表新的虚拟节点
 function path(n1,n2,container,parentComponent){
      //判断是不是元素类型(element)
   const {type,shapeFlag}=n2
    //处理组件 如何区分element还是component 类型
   
    switch(type){
      case Fragment:
      processFragment(n2,container)
      case Text:
        processText();
        break
        default:
          if(vnode.type=='string'){
            processElement(n2 ,container)
          }else if(shapeFlag==shapeFlag.STATEFUL_COMPONENT){
            processComponent(n2,container,parentComponent);
          }
    }
   
 }
 function processText(vnode:any,container:any){
    const {children}=vnode;
    const textNode=vnode.el=document.createTextNode(children);
    container.append(textNode)
 }
 function processFragment(vnode:any,container:any){
      mountChidren(vnode,container)
 }
function processElement(n1,n2:any,container:any){
  if(!n1){
    mountElement(vnode,container)
  }else{
    pathchElement(n1,n2,container)
  }
  
    
}

function pathchElement(n1,n2,container ){

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
   setupRenderEffect(instance,container,vnode)
 }

function setupRenderEffect(instacne:any,initialVNode,container){
  effect(()=>{
    if(!instacne.isMounted){
      //初始化
      const {proxy}=instacne
      const subTree=instacne.subTree=instacne.render.call(proxy);
      path(null,subTree,container,instacne);
      vnode.el= subTree.el
      instacne.isMounted=true
    }else{
      const {proxy}=instacne
      const subTree=instacne.render.call(proxy);
      const prevSubTree=instacne.subTree
      instacne.subTree=subTree
      path(prevSubTree,subTree,container,instacne);
      //更新逻辑
    }
   
  })
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

