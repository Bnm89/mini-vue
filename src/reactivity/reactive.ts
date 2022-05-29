

import {mutableHandler,readonlyHandler,shallowReadonlyHandles} from './baseHandlers'
export const enum ReactiveFlags{
    IS_REACTIVE='__v_isreactive',
    IS_READONLY='__v_isreadonly'
}
export function reactive(raw:any) {
   return createActiveObject(raw,mutableHandler)
}

export function readonly(raw:any) {
   return  createActiveObject(raw,readonlyHandler)
}
export function isReactive(value){
     return !!value[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly(value){
  return !!value[ReactiveFlags.IS_READONLY]
}
export function shallowReadonly(raw){
  return createActiveObject(raw,shallowReadonlyHandles)

}
function createActiveObject(raw:any,baseHandler){
    return new Proxy(raw,baseHandler)

}