import {trackEffects,trigger} from './effect';
import {hasChanged} from '../shared/index';
import {reactive} from './reactive'
class RefImpl{
private _value:any;
    public dep
    constructor(value){
       this._value=value
       this.dep=new Set();
    }
    get value(){
        trackEffects(this.dep) ;
     return this._value
    }
    set value(newValue){
        this._value=newValue;
        if(hasChanged(newValue,this.value)){
            
        }
        trigger(this.dep,'')
    }
}

export function ref(value){
   return new  RefImpl(value)
}