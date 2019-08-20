
const host = 'http://rap2api.taobao.org/app/mock/228821'

const _http = (method,url,data ) =>{

  return new Promise((resolve, reject)=>{
    wx.request({
      data,
      method,
      url:`${host}${url}`, 
      dataType:'json',
      success :(response)=>{
        let statusCode = response.statusCode
        if(statusCode >= 400){
          if(statusCode === 401){
            wx.redirectTo({ url: "pages/login/login" })
          }
          reject({statusCode,response})
        }else{
          resolve(response)
        }
      },
      fail:(errors) =>{
        wx.showToast({
          title: '请求失败',
          icon:'none'
        })
        reject(errors)
      }
    })
  })
}

const http ={
  get: (url,params) => _http('GET', url , params),
  post: (url, data ) => _http('POSt', url , data ),
  delete: (url , data) =>_http('DELETE', url ,data )
}

module.exports ={ http }