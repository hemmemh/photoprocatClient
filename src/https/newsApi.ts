import { $host } from '.'

export const addNews = async (info: any) => {
    const { data } = await $host.post('news', info)
    return data
}
export const getAllNews = async () => {
    const { data } = await $host.post('news/getAll')
    return data
}

export const addComment = async (info: any) => {
    const { data } = await $host.post('news/addComment', info)
    return data
}
