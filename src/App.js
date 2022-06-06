import './App.css';
import StudentList from './components/StudentList/StudentList';
import { useEffect } from 'react'
import studentContext from './store/studentContext'
import useFetch from './hooks/useFetch';

function App() {
  const { isLoading, isError, data: studentList, fetchData } = useFetch({
    url: 'students'
  })
  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
    <studentContext.Provider value={{ fetchData }}>
      <div className='app'>
        {!isLoading && <StudentList stus={studentList} />}
        {(isLoading && !isError) && <p>数据加载中...</p>}
        {isError && <p>{'数据加载失败！' + isError.message}</p>}
      </div>
    </studentContext.Provider>
  );
}

export default App;
