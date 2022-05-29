
import { isObject } from '../shared'
import { track, trigger } from './effect'
import { ReactiveFlags ,reactive,readonly} from './reactive'
import {extend} from '../shared/index'
const get = createGetter()
const set = createSttter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet=createGetter(true,true)
export const mutableHandler = {
    get,
    set,
}
export const readonlyHandler = {
    readonlyGet,
    set(target, key, val) {
        console.warn("不可以被修改")
        return true
    }
}
export const shallowReadonlyHandles=extend({},readonlyHandler,{
    get:shallowReadonlyGet
})
          

function createGetter(isReadonly = false,shallow=false) {
    return function get(target, key) {
    if (key == ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key == ReactiveFlags.IS_READONLY) {
            return isReadonly
        }
        if (!isReadonly) {
            track(target, key)
        }
        //判断res是不是一个object 
        
        const res = Reflect.get(target, key);
        if(shallow){
            return res
        }
        if(isObject(res)){
          return isReadonly?readonly(res): reactive(res)
        }
        //依赖收集
        return res
    }
}
function createSttter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value);
        //出发依赖

        trigger(target, key)
        return res
    }
}