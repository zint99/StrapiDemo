import { useState, useCallback } from 'react'

export default function useFetch(reqObj, callback) {
    const { method, url, body: reqBody } = reqObj
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const fetchData = useCallback(async function (reqData) {
        try {
            //重置上次Error
            setIsError(null)
            setIsLoading(true)
            const res = await fetch(`http://localhost:1337/api/${url}`, {
                method: method || 'get',
                headers: {
                    "Content-type": "application/json"
                },
                body: (reqObj.method === 'put' || reqObj.method === 'post' === true) ? JSON.stringify({ data: reqData }) : null
            })
            if (res.ok) {
                //get
                const jsonData = await res.json()
                setData(jsonData.data)
                //如果传入callback则执行
                callback && callback()
                setIsLoading(false)
            } else {
                switch (method) {
                    case "get":
                        throw new Error('请求数据错误！')

                    case "delete":
                        throw new Error('删除数据错误！')

                    case "post":
                        throw new Error('添加数据错误！')

                    case "put":
                        throw new Error('更新数据错误！')
                }
            }
        } catch (error) {
            setIsError(error)
        } finally {
            setIsLoading(false)
        }
    }, [])
    return { data, isLoading, isError, fetchData }
}