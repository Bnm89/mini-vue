export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
  };
  return component
}
export function setupComponent(instance) {
  //初始化
  //1.初始化props(initProps)
  //2.初始化Slot(initSlots)
  //3.setupStatefulComponent(initState)//有状态的组件
  setupStatefulComponent(instance)
}

export function setupStatefulComponent(instance: any) {
  //获取配置数据
  const component = instance.vnode.type;
  const { setup } = component;
  if (setup) {
    const setupResult = setup();
    handleSetupResult(instance, setupResult)
  }
}


function handleSetupResult(instance, setupResult: any) {
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}
function finishComponentSetup(instance: any) {
  const Component = instance.type;
  if (!Component.render) {
    //有render方法
    instance.render = Component.render
  }
}