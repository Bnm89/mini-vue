export function initSlots(inistance,childrn){
    const slots={}
    for(const key in childrn){
        const value=childrn[key];
        slots[key]=normalizeSlotValeue(value)
    }
    inistance.slots=slots
}


function normalizeSlotValeue(value){
  return  Array.isArray(value)?value:[value]
}