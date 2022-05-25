export function emit(instacne, event,...args) {
    console.log('emit', event);
    const { props } = instacne;
    //TPP开发思想 先写一个特定的行为 重构成通用的行为
    //add-foo 变成 addFoo
    const camelize=(str:string)=>{
      return  str.replace(/-(\w)/g,(_,c:string)=>{
         return c?c.toLocaleLowerCase():''
        })
    }
    const capitalize=(str:string)=>{
        return str.charAt(0).toLocaleLowerCase()+str.slice(1)
    }
    const toHandlerKey=(str:string)=>{
        return str?'on'+capitalize(event):''
    }
    const handlerName=toHandlerKey(camelize(event))
     const handler=props[handlerName];
     handler&&handler(...args)
}