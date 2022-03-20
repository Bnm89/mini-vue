class ReactiveEffect{
  private _fn:any
  constructor(fn){
    this._fn=fn;

     }
    run(){
     activeEffect=this
     this._fn();
    }
}
const targetMap=new Map()
export function track(target,key){
  //依赖不能重复，所以用set的数据结构  target-key-dep
  let depsMap=targetMap.get(target);
   if(!depsMap){
    depsMap=new Map();
    targetMap.set(target,depsMap)
   }
   let dep=depsMap.get(key)
   if(!dep){
     dep=new Set();
   }
   dep.push(activeEffect)
}
let  activeEffect;
export function effect(fn){
  //fn立即执行
  const _effect=new ReactiveEffect(fn)
  _effect.run()
}