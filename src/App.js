import './App.css';
import { useState } from 'react';

function Header(props) {
  return (
    <header>
      <h1><a href="/" onClick={(event) => {
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const lis = props.topics.map(topic => {
    return <li key={topic.id}><a id={topic.id} href={`/read/${topic.id}`} onClick={event => {
      event.preventDefault()
      props.onChangeMode(Number(event.target.id))
    }}>{topic.title}</a></li>
  })
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function App() {
  const _mode = useState('WELCOME') // 상태의 초기값
  console.log('_mode', _mode[0])
  const mode = _mode[0] // 상태의 값
  const setMode = _mode[1] // 상태를 변경할 수 있는 함수
  // const [mode, setMode] = useState('WELCOME') // 이렇게 축약가능
  const [id, setId] = useState(null)
  console.log('### id', id)
  const topics = [
    { id:1, title:'HTML', body:'HTML is ...' },
    { id:2, title:'CSS', body:'CSS is ...' },
    { id:3, title:'javascript', body:'javascript is ...' }
  ]
  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title="WELCOME" body="Hello, WEB"></Article>
  } else if(mode === 'READ') {
    const selTopic = topics.find(topic => {
      return topic.id === id
    })
    content = <Article title={selTopic.title} body={selTopic.body}></Article>
  }
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME')
        }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ')
        setId(_id)
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
