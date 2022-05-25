import { initProps } from "./componentProps";
import {PublicInstanceProxyHandlers} from './componentPubilcInstance'
import { emit } from "./compontentEmit";
import { initSlots } from "./compontentSlots";
export function createComponentInstance(vnode: any) {
    const component = {
        vnode,
        type:vnode.type,
        setupState:{},
        props:{},
        emit:()=>{},
        slots:{}
    }; 
    component.emit=emit.bind(null,component) as any
    return component
}
export function setupComponent(instance) {
  
    //初始化 props
     initProps(instance,instance.vnode.props)
    //初始化插槽
    initSlots(instance,instance.vnode.children)
    //处理setup的返回值
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
    const Component = instance.type;
      //代理对象
    instance.proxy=new Proxy({instance},PublicInstanceProxyHandlers)
    //拿到setup
    const { setup } = Component
    if (setup) {
        const setupResult= setup(instance.props,{
            emit:instance.emit
        });
        handleSetupResult(instance,setupResult)
    }
}

function handleSetupResult(instance:any,setupResult:any){
     //function object
     //处理函数
     if(typeof setupResult=='object'){
       instance.setupState=setupResult;
     }
     finishComponentSetup(instance)
}

function finishComponentSetup(instance:any){
   const Component=instance.type;
   if(Component.render){
       instance.render=Component.render
   }
}