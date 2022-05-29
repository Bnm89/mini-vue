import { extend } from '../shared/index'
let activeEffect;
let shouldtrack;

class ReactiveEffect {
    private _fn: any
    deps:[]
    active = true
    onStop?: () => {}
    constructor(fn, public scheduler?) {
        this._fn = fn
    }
    run() {

        if (!this.active) {
            return this._fn()
        }
        activeEffect = this;
        shouldtrack = true
        const result = this._fn()
        shouldtrack = false
        return result
    }
    stop() {
        if (this.active) {
            cleanupEffect(this);
            if (this.onStop) {
                this.onStop()
            }
            this.active = false
        }

    }
}
function cleanupEffect(effect) {
    effect.deps.forEach((dep: any, index) => {
        dep.delete(effect)
    })
    effect.deps.length=0
}
//使用map存储对象 一个map对应一个key
const targetMap = new Map()
//收集依赖
export function track(target, key) {
    if(!isTracking()) return
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep)
    }
   if(dep.has(activeEffect)) return
    dep.add(activeEffect);
    activeEffect.deps.push(dep)
}

function isTracking(){
    return shouldtrack && activeEffect!=undefined
}
//触发依赖
export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            effect.run()
        }

    }
}


export function effect(fn, options: any = {}) {
    //一上来就需要调用fn
    const scheduler = options.scheduler
    const _effect = new ReactiveEffect(fn, scheduler);
    // _effect.onStop=options.onStop
    extend(_effect, options)
    _effect.run();
    const runner = _effect.run.bind(_effect);
    runner.effect = _effect
    return runner
}

export function stop(runner) {
    runner.stop()
}