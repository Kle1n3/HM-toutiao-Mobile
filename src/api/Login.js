import request from '@/utils/request'

export const sendMsgApi = mobile => request({
    url: `/v1_0/sms/codes/${mobile}`,
})
export const userLoginApi = data => request({
    url: '/v1_0/authorizations',
    method: 'post',
    data,
})