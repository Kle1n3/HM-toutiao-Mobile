import request from '@/utils/request'

export const getChannelsApi = () => request({
    url: '/v1_0/user/channels',
})

export const getArticleList = params => request({ url: '/v1_0/articles', params })

export const getAllChannelsApi = () => request({
    url: '/v1_0/channels',
})

export const addUserChannelApi = data => request({ url: '/v1_0/user/channels', method: 'patch', data, })

export const delUserChannelApi = id => request({ url: '/v1_0/user/channels/' + id, method: 'delete', })

