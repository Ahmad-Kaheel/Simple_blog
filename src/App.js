import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Layout from './hocs/Layout';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';

const App = () => (
  <Router  basename={process.env.PUBLIC_URL} >
    <Layout>
      <Routes>
        <Route exact path = '/' element = {<Blog/>} />
        <Route exact path = '/category/:category' element = {<Category/>} />
        <Route exact path = '/blog/:id' element = {<BlogDetail/>} />
      </Routes>
    </Layout>
  </Router>
);

export default App ; 