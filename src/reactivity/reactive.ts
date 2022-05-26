
import { track, trigger } from './effect'
import {mutableHandler,readonlyHandler} from './baseHandlers'
export const enum ReactiveFlags{
    IS_REACTIVE='__v_isreactive',
    IS_READONLY='__v_isreadonly'
}
export function reactive(raw:any) {
    createActiveObject(raw,mutableHandler)
}

export function readonly(raw:any) {
    createActiveObject(raw,readonlyHandler)
}
export function isReactive(value){
     return !!value[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly(value){
  return !!value[ReactiveFlags.IS_READONLY]
}
function createActiveObject(raw:any,baseHandler){
    return new Proxy(raw,baseHandler)

}