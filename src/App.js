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

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault()
        const title = event.target.title.value
        const body = event.target.body.value
        props.onCreate(title, body)
      }}>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create"></input></p>
      </form>
    </article>
  )
}

function Update(props) {
  const [title, setTitle] = useState(props.title)
  const [body, setBody] = useState(props.body)
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event => {
        event.preventDefault()
        const title = event.target.title.value
        const body = event.target.body.value
        props.onUpdate(title, body)
      }}>
        <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
          setTitle(event.target.value)
        }}/></p>
        <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
          setBody(event.target.value)
        }}></textarea></p>
        <p><input type="submit" value="Update"></input></p>
      </form>
    </article>
  )
}

function App() {
  const [mode, setMode] = useState('WELCOME')
  const [id, setId] = useState(null)
  const [nextId, setNextId] = useState(4)
  const [topics, setTopics] = useState([
    { id:1, title:'HTML', body:'HTML is ...' },
    { id:2, title:'CSS', body:'CSS is ...' },
    { id:3, title:'javascript', body:'javascript is ...' }
  ])
  let content = null;
  let contextControl = null;

  if(mode === 'WELCOME') {
    content = <Article title="WELCOME" body="Hello, WEB"></Article>
  } else if(mode === 'READ') {
    const selTopic = topics.find(topic => {
      return topic.id === id
    })
    content = <Article title={selTopic.title} body={selTopic.body}></Article>
    contextControl = <>
      <li>
        <a href={"/update/"+id} onClick={event=>{
          event.preventDefault()
          setMode('UPDATE')
        }}>Update</a>
      </li>
    </>
  } else if(mode === 'CREATE') {
    content = <Create onCreate={(title, body) => {
      const newTopic = {
        id: nextId,
        title: title,
        body: body
      }
      const newTopics = [...topics, newTopic]
      setTopics(newTopics)
      setMode('READ')
      setId(nextId)
      setNextId(nextId+1)
    }}></Create>
  } else if(mode === 'UPDATE') {
    const selTopic = topics.find(topic => {
      return topic.id === id
    })
    content = <Update title={selTopic.title} body={selTopic.body} onUpdate={(title, body)=>{
      console.log('id', selTopic.id)
      console.log('title', title)
      console.log('body', body)
      const newTopics = [...topics]
      const index = newTopics.findIndex(topic=> {
        return topic.id === selTopic.id
      })
      newTopics[index] = {
        id: selTopic.id,
        title: title,
        body: body
      }
      setTopics(newTopics)
    }}></Update>
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
      <ul>
        <li>
          <a href="/create" onClick={event => {
            event.preventDefault()
            setMode('CREATE')
          }}>Create</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
