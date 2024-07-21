import { Button, Select, TextInput } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import PostCard from "../components/PostCard"

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    products: "uncategorized",
  })

  console.log(sidebarData)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")
    const sortFromUrl = urlParams.get("sort")
    const productsFromUrl = urlParams.get("products")
    if (searchTermFromUrl || sortFromUrl || productsFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        products: productsFromUrl,
      })
    }

    const fetchPost = async () => {
      setLoading(true)
      const searchQuery = urlParams.toString()
      const res = await fetch(`/api/post/loadpost?${searchQuery}`)

      if (!res.ok) {
        setLoading(false)
        return
      }
      if (res.ok) {
        const data = await res.json()
        setPosts(data.blogs || [])

        setLoading(false)
        if (data.blogs.length === 6) {
          setShowMore(true)
        } else {
          setShowMore(false)
        }
      }
    }
    fetchPost()
  }, [location.search])

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      console.log(`Input changed: ${id} = ${value}`)
      setSidebarData({ ...sidebarData, searchTerm: e.target.value })
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc"
      setSidebarData({ ...sidebarData, sort: order })
    }
    if (e.target.id === "products") {
      const products = e.target.value || "uncategorized"
      setSidebarData({ ...sidebarData, products })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted with sidebarData:", sidebarData)
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("searchTerm", sidebarData.searchTerm)
    urlParams.set("sort", sidebarData.sort)
    urlParams.set("products", sidebarData.products)
    const searchQuery = urlParams.toString()
    console.log("Navigating to /search with query:", searchQuery)
    navigate(`/search?${searchQuery}`)
  }

  const handleShowMore = async () => {
    const numberOfPosts = posts.length
    const startIndex = numberOfPosts
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("startIndex", startIndex)
    const searchQuery = urlParams.toString()
    const res = await fetch(`/api/post/loadpost?${searchQuery}`)
    if (!res.ok) {
      const data = await res.json()
      setPosts([...posts, ...data.posts])
      if (data.posts.length === 6) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div
        className="p-7 border-b md:border-r 
      md:min-h-screen border-gray-600"
      >
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Products</label>
            <Select
              onChange={handleChange}
              value={sidebarData.products}
              id="products"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="biscuitline">Biscuit Line</option>
              <option value="pastaline">Pasta Line</option>
              <option value="waferbiscuit">Wafer Biscuit</option>
              <option value="noodlesline">Noodles Line</option>
              <option value="macaroniline">Macaroni Line</option>
              <option value="flourline">Flour Line</option>
            </Select>
          </div>
          <Button type="submit" className="bg-yellow-600">
            Filter
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1
          className="text-3xl font-semibold sm:border-b
         border-gray-600 p-3 mt-5"
        >
          Post results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-600">There is no posts found!</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((blogs) => <PostCard key={blogs._id} blog={blogs} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-yellow-500 text-lg hover:underline p-7 w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
