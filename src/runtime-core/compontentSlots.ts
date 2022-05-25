export function initSlots(inistance,childrn){
    const slots={}
    for(const key in childrn){
        const value=childrn[key];
        slots[key]=(props)=>normalizeSlotValeue(value(props))
    }
    inistance.slots=slots
}


function normalizeSlotValeue(value){
  return  Array.isArray(value)?value:[value]
}