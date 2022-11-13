import logo from './logo.svg';
import './App.css';

function Header(props) {
  return (
    <header>
      <h1><a href="/">{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const lis = props.topics.map(topic => {
    return <li key={topic.id}><a href={`/read/${topic.id}`}>{topic.title}</a></li>
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
      <Header title="WEB"></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
