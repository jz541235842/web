//包含应用中所有接口请求函数的模块
//每个函数返回值的都是一个promise
import ajax from './ajax'
// 登录
// export function reqLogin(data){
//    return ajax('authAdmin/passwordLogin',data,'post');
//  }
 export const reqLogin=(data)=>ajax('authAdmin/passwordLogin',data,'post')