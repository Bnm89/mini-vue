
import {createRenderer} from '../runtime-core'

function createElement(type){
  return document.createElement(type)
}
function pathProp(el,key,value){
    const isOn=(key:string)=>/^on[A-Z]/.test(key);
    if(isOn(key)){
      const event=key.slice(2).toLocaleLowerCase();
      el.addEventListener(event,key)
    }else{
      el.setAtteribute(key,value)
    }

}

function insert(el,parent){
      parent.append(el)
}

const render:any= createRenderer({
    createElement,
    pathProp,
    insert
})

export function creatApp(...args){
    return render.creatApp(...args)
}