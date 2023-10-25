import { Routes , Route,  } from "react-router-dom";
import Detail from "./views/detail/Detail";
import Form from "./views/form/Form";
import Home from "./views/home/Home";
import Landing from "./views/landing/Landing";

function App() {
  return (
      <div>
        <Routes>
          <Route path='/' element={ <Landing/>} />
          <Route exact path='/home' element={ <Home/>} />
          <Route path='/create' element={ <Form/>} />
          <Route path='/home/:id' element={ <Detail/>} />
        </Routes>
      </div>
  );
}

export default App;
