 export const Fragment=Symbol('Fragment');
 export const Text=Symbol('Text')
export function createVNode(type,props?,children?){
    const vnode={
        type,
        props,
        children,
        el:null
    }

    return vnode
}

export function createTextVNode(text:string){
     return createVNode(Text,{},text)
}