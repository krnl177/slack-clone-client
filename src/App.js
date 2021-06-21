import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home';
import { Container } from 'semantic-ui-react'
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Container>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
      </Container>
    </Router>
  );
}


export default App;
