import './App.css';
import StudentList from './components/StudentList/StudentList';
import { useState, useEffect } from 'react'

function App() {
  const [studentList, setStudentList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    async function fetchData() {
      try {
        //重置上次Error
        setError(null)
        const res = await fetch("http://localhost:1337/api/student")
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
    }
    fetchData()
  }, [])

  return (
    <div className='app'>
      {!isLoading && <StudentList stus={studentList} />}
      {(isLoading && !error) && <p>数据加载中...</p>}
      {error && <p>{'数据加载失败！' + error.message}</p>}
    </div>
  );
}

export default App;
