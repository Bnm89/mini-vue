
export const App={
   render(){
       return h('div','hi,mini-vue'+this.msg)
   },
   setup(){
       //compositon api
       return {
           msg:'mini-vue'
       }
   }
}