//进行数据存储管理的工具模块
import store from 'store'
export default{
    //保存user
    saveUser(user){
        // localStorage.setItem('user',JSON.stringify(user))
        store.set('user',user)
    },
    //读取user
    getUser(){
        // return JSON.parse(localStorage.getItem('user')||'{}')
        return store.get('user')||{}
    },
    //删除user
    removeUser(){
        // localStorage.removeItem('user')
        store.remove('user')
    }
}