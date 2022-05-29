import {computed} from '../computed'
import {reactive} from '../reactive'
describe('computed',()=>{
  it('happy path',()=>{
    //ref 
    //.value
    //缓存
    const user =reactive({
      age:1
    })

    const age=computed(()=>{
      return user.age
    });
    expect(age.value).toBe(1)
  })
  it('should compute lazily',()=>{
    const value=reactive({
      foo:1
    })
    const getter=jest.fn(()=>{
      return value.foo
    })
    const cValue=computed(getter);
    expect(getter).not.toHaveBeenCalled()
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(1)
    value.foo=2;
    expect(getter).toHaveBeenCalledTimes(1)
  })
})