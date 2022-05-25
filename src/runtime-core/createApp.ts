import { createVNode } from "./vnode"
export function creatAppApi(render){
return function createApp(rootComponent){
     return {
         mount(rootContainer){
             // 先转化成虚拟节点（vnode)
             //把组件（compontent）转化成虚拟节点（v node）
             //所有的逻辑操作都会基于这个虚拟节点（v node）做处理

             const vnode=createVNode(rootComponent);

             render(vnode,rootContainer)
         }
     }
}
}
