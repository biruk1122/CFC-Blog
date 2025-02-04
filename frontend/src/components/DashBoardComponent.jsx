import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button, Table } from "flowbite-react"
import { Link } from "react-router-dom"
import {
  HiOutlineUserGroup,
  HiArrowNarrowUp,
  HiAnnotation,
  HiDocumentText,
} from "react-icons/hi"

export default function DashBoardComponent() {
  const [members, setMembers] = useState([])
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])
  const [totalMembers, setTotalMembers] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [lastMonthMembers, setLastMonthMembers] = useState(0)
  const [previousMonthPosts, setPreviousMonthPosts] = useState(0)
  const [lastMonthComments, setLastMonthComments] = useState(0)
  const { currentUser } = useSelector((state) => state.user)
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/user/loadmembers?maxItems=5")
        const data = await res.json()
        if (res.ok) {
          setMembers(data.members)
          setTotalMembers(data.totalMembers)
          setLastMonthMembers(data.lastMonthMembers)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/loadpost?maxItems=5")
        const data = await res.json()
        if (res.ok) {
          setPosts(data.blogs)
          setTotalCount(data.totalCount)
          setPreviousMonthPosts(data.previousMonthPosts)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?maxItems=5")
        const data = await res.json()
        if (res.ok) {
          setComments(data.comments)
          setTotalComments(data.totalComments)
          setLastMonthComments(data.lastMonthComments)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser.administrator) {
      fetchComments()
      fetchMembers()
      fetchPosts()
    }
  }, [currentUser])

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div
          className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full
    rounded-md shadow-md"
        >
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Members</h3>
              <p className="text-2xl">{totalMembers}</p>
            </div>
            <HiOutlineUserGroup
              className="bg-teal-600 text-white rounded-full
          text-5xl p-3 shadow-lg"
            />
          </div>
          <div className=" flex gap-2 text-sm">
            <span className="text-green-500">
              <HiArrowNarrowUp />
              {lastMonthMembers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div
          className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full
    rounded-md shadow-md"
        >
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Commenst
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation
              className="bg-indigo-600 text-white rounded-full
          text-5xl p-3 shadow-lg"
            />
          </div>
          <div className=" flex gap-2 text-sm">
            <span className="text-green-500">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div
          className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full
    rounded-md shadow-md"
        >
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalCount}</p>
            </div>
            <HiDocumentText
              className="bg-lime-600 text-white rounded-full
          text-5xl p-3 shadow-lg"
            />
          </div>
          <div className=" flex gap-2 text-sm">
            <span className="text-green-500">
              <HiArrowNarrowUp />
              {previousMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mx-auto justify-center">
        <div
          className="flex flex-col w-full md:w-auto shadow-md p-2
        rounded-md dark:bg-gray-800"
        >
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Members</h1>
            <Button className="bg-yellow-500">
              <Link to={"/dashboard?tab=members"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Member image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {members &&
              members.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user.avatar}
                        alt="user image"
                        className="w-10 h-10 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div
          className="flex flex-col w-full md:w-auto shadow-md p-2
        rounded-md dark:bg-gray-800"
        >
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button className="bg-yellow-500">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Contents</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div
          className="flex flex-col w-full md:w-auto shadow-md p-2
        rounded-md dark:bg-gray-800"
        >
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Post</h1>
            <Button className="bg-yellow-500">
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Post Products</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((blogs) => (
                <Table.Body key={blogs._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={blogs.image}
                        alt="user image"
                        className="w-14 h-10 rounded-md"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-5">{blogs.products}</Table.Cell>
                    <Table.Cell className="w-96">{blogs.subject}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  )
}
