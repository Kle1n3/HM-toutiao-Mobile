import request from '@/utils/request'

export const getArticleDetailApi = article_id => request({ url: '/v1_0/articles/' + article_id })

export const addUserFollowApi = data => request({
    method: 'post',
    url: '/v1_0/user/followings',
    data,
})

export const cancelUserFollowApi = id => request({
    method: 'DELETE',
    url: '/v1_0/user/followings/' + id,
})


export const addCollectArtApi = data => request({
    method: 'post',
    url: '/v1_0/article/collections',
    data,
})

export const cancelCollectArtApi = id => request({
    method: 'DELETE',
    url: '/v1_0/article/collections/' + id,
})


export const addLikeArtApi = data => request({
    method: 'post',
    url: '/v1_0/article/likings',
    data,
})

export const cancelLikeArtApi = id => request({
    method: 'DELETE',
    url: '/v1_0/article/likings/' + id,
})

export const getCommentListApi = params => request({
    method: 'get',
    url: '/v1_0/comments',
    params,
})

export const addLikeCommentApi = data => request({
    method: 'post',
    url: '/v1_0/comment/likings',
    data,
})

export const cancelLikeCommentApi = id => request({
    method: 'DELETE',
    url: '/v1_0/comment/likings/' + id,
})

export const postCommentApi = data => request({
    method: 'POST',
    url: '/v1_0/comments',
    data,
})