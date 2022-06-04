import './App.css';
import StudentList from './components/StudentList/StudentList';
import { useState, useEffect, useCallback } from 'react'
import studentContext from './store/studentContext'

function App() {
  const [studentList, setStudentList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchData = useCallback(async function () {
    try {
      //重置上次Error
      setError(null)
      const res = await fetch("http://localhost:1337/api/students")
      if (res.ok) {
        const data = await res.json()
        setStudentList(data.data)
        setIsLoading(false)
      } else {
        throw new Error('数据请求错误！')
      }
    } catch (error) {
      setError(error)
    }
  }, [])
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <studentContext.Provider value={{ fetchData }}>
      <div className='app'>
        {!isLoading && <StudentList stus={studentList} />}
        {(isLoading && !error) && <p>数据加载中...</p>}
        {error && <p>{'数据加载失败！' + error.message}</p>}
      </div>
    </studentContext.Provider>

  );
}

export default App;
