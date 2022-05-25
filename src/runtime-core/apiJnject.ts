import { getCurrentInstance } from "./component";


export function provide(key, value) {
    //存
    const currentInstance: any = getCurrentInstance()
    if (currentInstance) {
        let { provides } = currentInstance;
        const parentProvides=currentInstance.parent.provides
        //init
        if(provides==parentProvides){
            provides=currentInstance.provides=Object.create(parentProvides)
        }
        provides[key] = value
    }
}


export function inject(key) {
    //取
    const currentInstance: any = getCurrentInstance()
    if (currentInstance) {
        const { parent } = currentInstance;
        const parentProvides = currentInstance.parent.provides;
        return parentProvides[key]
    }
}