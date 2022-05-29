import {isReadonly,shallowReadonly} from '../reactive';
describe('shallowReadonly',()=>{
  const props=shallowReadonly({n:{foo:1}});
  expect(isReadonly(props)).toBe(true);
  expect(isReadonly(props.n)).toBe(false)
})