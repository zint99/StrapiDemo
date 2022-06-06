import { useState, useCallback } from 'react'

export default function useFetch(reqObj) {
    const { method, url, body } = reqObj
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)
    const fetchData = useCallback(async function () {
        try {
            //重置上次Error
            setIsError(null)
            const res = await fetch(`http://localhost:1337/api/${url}`, {
                method: method || 'get',
                headers: {
                    "Content-type": "application/json"
                },
                body: (reqObj.method === 'put' || reqObj.method === 'post' === true) ? JSON.stringify({ data: body }) : null
            })
            if (res.ok) {
                const jsonData = await res.json()
                setData(jsonData.data)
                setIsLoading(false)
            } else {
                throw new Error('数据请求错误！')
            }
        } catch (error) {
            setIsError(error)
        } finally {
            setIsLoading(false)
        }
    }, [])
    return { data, isLoading, isError, fetchData }
}