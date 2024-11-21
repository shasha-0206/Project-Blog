import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import MyPosts from './components/MyPosts'
import Editor from './components/Editor';
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost";
import ProfilePage from './components/ProfilePage';
import ScrollToTop from "./components/ScrollTop";
import AIEditor from "./components/AIEditor";

const App = () => {


    return (
        <Router>
            <ScrollToTop />
            <Navbar /> {/* Navbar is always visible */}
            
            <Routes>

                {/* Authentication Routes */}
                <Route path="/" element={<Home  />} />
                <Route path="signup" element={<AuthForm mode='signup' />} />
                <Route path="signin" element={<AuthForm  />} />
                <Route path="Editor" element={<Editor />}/>
                <Route path="MyPosts" element={<MyPosts />}/>
                <Route path="/posts/:postId" element={<PostDetails />} />
                <Route path="/posts/edit/:postId" element={<EditPost />}/>
                <Route path="/profile" element={<ProfilePage />}/>
                <Route path="/generate-ai" element={<AIEditor/>}/>
        

            </Routes>

            <Footer />
        </Router>
    );
}

export default App;
