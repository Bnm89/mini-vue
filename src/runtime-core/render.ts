
 import {createComponentInstance,setupComponent} from './component'
 import {hasChanged,isObject} from '../shared/index'
 export function render(vnode,container){
  //patch
  patch(vnode,container)
}


function patch(vnode,container){
     //处理组件
     //判断是不是element元素类型
     //如何区分一个element还是component类型呢？
     if(typeof vnode.type=='string'){
      processElement(vnode,container)
     }else if (isObject(vnode.type)){
      //处理元素
      processComponent(vnode,container) 
     }
       
}
function processElement(vnode:any,container:any){
  mountElement(vnode,container)
}
function mountElement(vnode:any,container:any){
 
  const el=document.createElement(vnode.type);
  const {children,props}=vnode;
  if(typeof children==='string'){
    el.textContent=children
  }else if(Array.isArray(children)){
    mountChildren(children,el)
  }
  for(const key in props){
    const val=props[key];
    el.setAttribute(key,val)
  }
  container.append(el);
}
function mountChildren(vnode,container){
  vnode.children.forEach((v)=>{
    patch(v,container)
   })
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
