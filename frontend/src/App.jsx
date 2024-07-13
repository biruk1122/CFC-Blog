import React from "react"
import "flowbite/dist/flowbite.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// importing pages from the pages & components folder
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import AdminPrivatePost from "./components/AdminPrivatePost"
import AddPost from "./pages/AddPost"
import UpdateBlogs from "./pages/UpdateBlogs"
import BlogPostPages from "./pages/BlogPostPages"
import Search from "./pages/Search"

export default function App() {
  return (
    //Routing the pages using react-router-pakage to create a single page application (SPAs)
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<AdminPrivatePost />}>
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/update-blogs/:postId" element={<UpdateBlogs />} />
        </Route>

        <Route path="/products" element={<Products />} />
        <Route path="/blogs/:blogPermalink" element={<BlogPostPages />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
