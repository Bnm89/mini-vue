class ReactiveEffect{
  private _fn:any;
  public scheduler:Function | undefined;
  deps:[]
  constructor(fn,scheduler?:Function){
    this._fn=fn;
     this.scheduler=scheduler;
     }
    run(){
     activeEffect=this
     return this._fn();
    }
    stop(){
      this.deps.forEach((dep:any)=>{
        dep.delete(this)
      })
    }
}
const targetMap=new Map()
//收集依赖
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
//触发依赖
export function trigger(target,key){
  let depsMap=targetMap.get(target);
  let dep=depsMap.get('key')
  for(const effect of dep){
    if(effect.scheduler){
      effect.scheduler()
    }else{
      effect.run()
    }
    
  }
}
let  activeEffect;
export function effect(fn,options:any={}){
  //fn立即执行
  const scheduler=options.scheduler
  const _effect=new ReactiveEffect(fn,scheduler)
  _effect.run()
  return _effect.run.bind(_effect)
}

export function stop(runner){
        
}