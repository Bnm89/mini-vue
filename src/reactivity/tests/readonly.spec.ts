
import {readonly} from '../reactive'

describe('readonly',()=>{
    it('happy path',()=>{
        const originalq={foo:1,bar:{baz:2}};
        const wrapped=readonly(originalq);
        expect(wrapped).not.toBe(originalq);
        expect(wrapped.foo).toBe(1)

        
    })
    it('warn then call set',()=>{
        console.warn=jest.fn()
        const user:any=readonly({
            age:22
        })
        user.age=11;
        expect(console.warn).toBeCalled()
    })
})