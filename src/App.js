import './App.css';
import { useState } from 'react';
import { Login } from './components/account/Login';
import imageURL from './books.jpg';
import Home from './components/account/Home';
import { BrowserRouter as Router, Routes, Route ,Navigate,Outlet} from "react-router-dom";
import Headerfile from "./components/header/Headerfile";
import Explore from './components/explore/Explore';
import Create  from './components/create/CreatePost';
import Food from './components/Genre/Food';
import Motivation from './components/Genre/Motivation';
import Tech from './components/Genre/Tech';
import Movie from './components/Genre/Movie';
import Fashion from './components/Genre/Fashion';
import Games from './components/Genre/Fashion';
import Book from './components/Genre/Book';
import DetailedView from './components/details/DetailedView';
import DataProvider from './context/DataProvider';
import UpdatePost from './components/create/UpdatePost';
import  Help  from './components/help/Help';
import Profile from './components/profile/Profile';
import Inspiration from './components/inspiration/Inspiration';
import Comments from './components/details/comments/Comments';
import LikedPost from './components/profile/LikedPost';
import SavedPosts from './components/profile/SavedPosts';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? 
    <>
      <Headerfile />
      <Outlet />
    </> : <Navigate replace to='/' />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  
  return (
    <div className="App">
      <DataProvider>
      <Router>
      
        <Routes>
          <Route path="/" element={<Login imageURL={imageURL} isUserAuthenticated={isUserAuthenticated}/>}/>
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/home" element={<Home/>}/>
            </Route>
            <Route path='/explore' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/explore" element={<Explore/>}/>
            </Route>
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/create" element={<Create/>}/>
            </Route>
            <Route path='/LikedPosts' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/LikedPosts" element={<LikedPost/>}/>
            </Route>
            <Route path='/SavedPosts' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/SavedPosts" element={<SavedPosts/>}/>
            </Route>
            <Route path='/Motivational Blog' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/Motivational Blog" element={<Motivation/>}/>
            </Route>
            <Route path='/Food Blog' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/Food Blog" element={<Food/>}/>
            </Route>
            <Route path='/Tech Blog' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/Tech Blog" element={<Tech/>}/>
            </Route>
            <Route path='/Fashion Blog' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/Fashion Blog" element={<Fashion/>}/>
            </Route>
            <Route path='/Books Blog' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/Books Blog" element={<Book/>}/>
            </Route>
            <Route path='/Games Blog' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/Games Blog" element={<Games/>}/>
            </Route>
            <Route path='/Movie Blog' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/Movie Blog" element={<Movie/>}/>
            </Route>
            <Route path='/posts/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/posts/:id" element={<DetailedView/>}/>
            </Route>
            <Route path='/postss/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/postss/:id" element={<DetailedView/>}/>
            </Route>
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/update/:id" element={<UpdatePost/>}/>
            </Route>
            <Route path='/delete/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/delete/:id" element={<Home/>}/>
            </Route>
            <Route path='/postsBy/:username' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/postsBy/:username" element={<Home/>}/>
            </Route>
            <Route path='/help' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/help" element={<Help/>}/>
            </Route>
            <Route path='/Myprofile' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path="/Myprofile" element={<Profile/>}/>
            </Route>
            <Route path='/inspiration' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/inspiration' element={<Inspiration/>}/>
            </Route>
            <Route path='/addcomment' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/addcomment' element={<Comments/>}/>
            </Route>
          
        </Routes>
      </Router>
      </DataProvider>
    </div>
  );
}

export default App;
