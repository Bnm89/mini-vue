export function reactive(raw){
  return  new Proxy(raw,{
    get(target,key){
      const res=Reflect.get(target,key);
      //ToDD 依赖收集
      track(target,key)
      return res
    },
    set(target,key,value){
        const res=Reflect.set(target,key,value);
    //TODD 触发依赖
    return res
    }
  })
    
}