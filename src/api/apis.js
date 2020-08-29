import axios from 'axios'
const IP = 'http://127.0.0.1:5000'
axios.defaults.baseURL = IP

//查看头像图片地址
export const GET_ACC_IMG = IP + "/upload/imgs/acc_img/"

// 上传商品图片的地址
export const UPDATE_GOODS_IMG = IP + "/goods/goods_img_upload"
// 查看商品图片的地址
export const GET_GOODS_IMG = IP + "/upload/imgs/goods_img/"

//上传店铺图片地址
export const UPDATE_STORE_IMG= IP + "/shop/upload"
//查看店铺图片的地址
export const GET_STORE_IMG= IP + "/upload/shop/"




// ES5
// export function login(account,password){
//     return axios.post('/users/checkLogin',{account,password})
// }
// ----------------------------------------------账号管理模块------------------------------------------------------------------------------//
//ES6 //登录
export var login = (account, password) => axios.post('/users/checkLogin', { account, password })
//显示登录 token
export var checktoken = (token) => axios.get('/users/checktoken', { params: { token } })
//添加账户
export var adduser = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup })
//获取账号列表
export var userlist = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })
//删除账号
export var deluser = (id) => axios.get('/users/del', { params: { id } })
//批量删除账号
export var delallusers = (ids) => axios.get('/users/batchdel', { params: { ids } })
//修改账号
export var editueser = (id, account, userGroup) => axios.post('/users/edit', { id, account, userGroup })
//检查旧密码正确性
export var checkoldpwd = (oldPwd, id) => axios.get('/users/checkoldpwd', { params: { oldPwd, id } })
//修改密码
export var editpwd = (newPwd, id) => axios.post('/users/editpwd', { newPwd, id })
//获取账号（个人中心）信息
export var accountinfo = (id) => axios.get('/users/accountinfo', { params: { id } })

// ----------------------------------商品管理模块-----------------------------------------------------------------------------//

// 添加分类
export var addcate = (cateName, state) => axios.post('/goods/addcate', { cateName, state })
//获取分类
export var catelist = (currentPage, pageSize) => axios.get('/goods/catelist', { params: { currentPage, pageSize } })
// 删除分类
export var delcate = (id) => axios.get('/goods/delcate', { params: { id } })
// 修改分类
export var editcate = (id, cateName, state) => axios.post('/goods/editcate', { id, cateName, state })
//查询所有分类名称
export var categories = () => axios.get('/goods/categories', { params: {} })

//商品图片上传接口
export var goods_img_upload = (code, msg, imgUrl) => axios.post('goods/goods_img_upload', { code, msg, imgUrl })
//添加商品
export var add = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc })
//获取商品列表 
export var list = (currentPage, pageSize) => axios.get('/goods/list', { params: { currentPage, pageSize } })
//删除商品
export var del = (id) => axios.get('/goods/del', { params: { id } })
//修改商品 
export var edit = (params) => axios.post('/goods/edit', params)

// ------------------------------------------订单管理模块----------------------------------------------------------------------------------------------------------//
// 获取订单列表(带查询功能)
export var orderlist = (params) => axios.get('/order/list', { params })
//查询
export var ordersearch = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/search', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })
//获取订单详情
export var orderdetail = (id) => axios.get('/order/detail', { params: { id } })
// 修改订单
export var orderedit = (date) => axios.post('/order/edit',date)

//------------------------------------------店铺管理------------------------------------//
//获取店铺详情 /shop/info
export var shopinfo = () => axios.get('/shop/info')
//店铺图片上传接口/shop/upload
export var shopupload = () => axios.post('/shop/upload')
//店铺内容修改 /shop/edit
export var shopedit = (params) => axios.post('/shop/edit',params)


//---------------------------------------统计视图------------------------------------------
// 首页报表接口
export var totaldata = () => axios.get('/order/totaldata')
// 订单报表接口
export var ordertota = (date) => axios.get('/order/ordertotal',{params:{date}})
