
import { track, trigger } from './effect'
import {mutableHandler,readonlyHandler} from './baseHandlers'
export function reactive(raw:any) {
    createActiveObject(raw,mutableHandler)
}

export function readonly(raw:any) {
    createActiveObject(raw,readonlyHandler)
}

function createActiveObject(raw:any,baseHandler){
    return new Proxy(raw,baseHandler)

}