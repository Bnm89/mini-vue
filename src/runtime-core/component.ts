
export function createComponentInstance(vnode: any) {
    const component = {
        vnode,
        type:vnode.type
    };

    return component
}
export function setupComponent(instance) {
    //初始化 props
    // initProps()
    //初始化插槽
    // initSlots()
    //处理setup的返回值
    setupStatefulComponent(instance)
}
function setupStatefulComponent(instance: any) {
    const Component = instance.type;
    //拿到setup
    const { setup } = Component
    if (setup) {
        const setupResult= setup();
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