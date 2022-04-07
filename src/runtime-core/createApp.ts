import {createVNode} from './vnode'
import {render} from './render'
export function createApp(rootComponent){
    return {
      mount(rootContainer){
        //先转化为虚拟节点(vnode)
        //componten转化为虚拟节点(vnode)
        //所有的逻辑操作都会基于vnode进行操作
        const vnode = createVNode(rootComponent);
        render(vnode,rootContainer)
      }
    }
}
