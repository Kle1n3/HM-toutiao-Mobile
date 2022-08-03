import request from '@/utils/request'


export const getUserInfoApi = () => request({
    url: '/v1_0/user',
})

export const getUserProfileApi = () => request({
    url: '/v1_0/user/profile',
})

export const updateUserPhotoApi = data => request({
    method: 'patch',
    url: '/v1_0/user/photo',
    data,
})

export const updateUserProfileApi = data => request({
    method: 'patch',
    url: '/v1_0/user/profile',
    data,
})