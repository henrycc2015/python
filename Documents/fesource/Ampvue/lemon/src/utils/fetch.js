const serverPath = 'https://egis-cssp-dmzstg1.pingan.com.cn'

export default {
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: serverPath + url,
        data: data,
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}