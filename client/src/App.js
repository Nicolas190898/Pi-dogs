import { Routes , Route,  } from "react-router-dom";

import Form from "./views/form/Form";
import Home from "./views/home/Home";
import Landing from "./views/landing/Landing";
import CardDetail from "./views/detail/cardDetail";

function App() {
  return (
      <div>
        <Routes>
          <Route path='/' element={ <Landing/>} />
          <Route exact path='/home' element={ <Home/>} />
          <Route path='/create' element={ <Form/>} />
          <Route path='/detail/:id' element={<CardDetail/> } />
        </Routes>
      </div>
  );
}

export default App;
