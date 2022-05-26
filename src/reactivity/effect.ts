
class ReactiveEffect {
    private _fn: any
    constructor(fn) {
        this._fn = fn
    }
    run() {
        activeEffect=this
        this._fn()
    }
}
//使用map存储对象 一个map对应一个key
const targetMap = new Map()
//收集依赖
export function track(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key,dep)
    }
    dep.add(activeEffect);
  
}
//触发依赖
export function trigger(target,key){
    let depsMap=targetMap.get(target);
    let dep=depsMap.get(key);
    for(const effect of dep){
        effect.run()
    }
}

let activeEffect;

export function effect(fn) {
    //一上来就需要调用fn
    const _effect = new ReactiveEffect(fn);
    _effect.run()
}