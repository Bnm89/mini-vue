import {reactive} from '../reactive'
import {effect} from '../effect'
describe("effect",()=>{
  it('happy path',()=>{
    const user= reactive({
      age:10
    });
    let nextAge;
    effect(()=>{
     user.age+1
    })
    expect(nextAge).toBe(11)
    //更新触发依赖
    user.age++
    expect(nextAge).toBe(12)
  })
 it('return runner when call effect',()=>{
   let foo=10;
  const runner=effect(()=>{
     foo++
     return 'foop'
   })
   expect(foo).toBe(11)
   const r=runner()
   expect(foo).toBe(12)
   expect(r).toBe('foop')
 })
})