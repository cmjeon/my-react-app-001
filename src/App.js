import logo from './logo.svg';
import './App.css';

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
      props.onChangeMod(event.target.id)
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
  const topics = [
    {
      id:1, title:'HTML', body:'HTML is ...'
    },
    {
      id:2, title:'CSS', body:'CSS is ...'
    },
    {
      id:3, title:'javascript', body:'javascript is ...'
    }
  ]
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() => {
        alert('### I\'m header')
        }}></Header>
      <Nav topics={topics} onChangeMod={(id) => {
        alert(id);
      }}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
