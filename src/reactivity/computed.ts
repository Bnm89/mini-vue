import { effect } from "./effect";
import { ReactiveEffect } from './effect'
class ComputedRefImpl {
    private _gertter: any;
    private _dirty: boolean = true
    private _value: any
    private _effect: any
    constructor(getter) {
        this._gertter = getter;
        this._effect = new ReactiveEffect(getter,()=>{
            if(this._dirty){
                this._dirty=true
            }
           
        })
    }
    get value() {
        if (this._dirty) {
            this._dirty = false
            this._value = this._effect.run()
        }
        return this._value
    }
    set value() {

    }
}


export function computed(getter) {
    return new ComputedRefImpl(getter)
}