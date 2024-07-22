import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import React, { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "../firebase"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export default function UpdateBlogs() {
  const [imageFile, setImageFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [dataForm, setDataForm] = useState({
    _id: "",
    subject: "",
    products: "uncategorized",
    image: "",
    content: "",
  })
  const [submissionFailure, setSubmissionFailure] = useState(null)
  const { postId } = useParams()

  const redirect = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/post/loadpost?postId=${postId}`)
        const details = await res.json()

        console.log("Fetched blog details:", details)

        if (!res.ok) {
          setSubmissionFailure(details.message)
          return
        }
        if (res.ok) {
          setSubmissionFailure(null)
          const blogPost = details.blogs[0]
          console.log("Setting dataForm with blog post:", blogPost)
          setDataForm((prevState) => ({
            ...prevState,
            _id: blogPost._id,
            subject: blogPost.subject,
            products: blogPost.products,
            image: blogPost.image,
            content: blogPost.content,
          }))
        }
      } catch (error) {
        console.log(error)
        setSubmissionFailure("Failed to Load Post.")
      }
    }
    fetchBlog()
  }, [postId])

  useEffect(() => {
    console.log("dataForm updated:", dataForm)
  }, [dataForm])

  const imageUploadProcessor = async () => {
    try {
      if (!imageFile) {
        setUploadError("Select an image please.")
        return
      }
      setUploadError(null)

      const storage = getStorage(app)
      const imageName = new Date().getTime() + "-" + imageFile.name
      const storageRef = ref(storage, imageName)
      const handleTaskUpload = uploadBytesResumable(storageRef, imageFile)

      handleTaskUpload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress.toFixed(0))
        },
        (error) => {
          setUploadError("Image upload failed")
          setUploadProgress(null)
        },
        () => {
          getDownloadURL(handleTaskUpload.snapshot.ref).then((downloadURL) => {
            setUploadProgress(null)
            setUploadError(null)
            setDataForm((prevState) => ({
              ...prevState,
              image: downloadURL,
            }))
          })
        }
      )
    } catch (error) {
      setUploadError("Image upload failed")
      setUploadProgress(null)
      console.log(error)
    }
  }

  const submitAction = async (e) => {
    e.preventDefault()

    console.log("Updating post with ID:", dataForm._id)
    console.log("Current user ID:", currentUser._id)

    if (!dataForm._id || !currentUser._id) {
      setSubmissionFailure("Post ID or User ID is missing.")
      return
    }

    try {
      const res = await fetch(
        `/api/post/updatepost/${dataForm._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        }
      )
      const details = await res.json()
      if (!res.ok) {
        setSubmissionFailure(details.message)
        return
      }
      if (res.ok) {
        setSubmissionFailure(null)
        redirect(`/post/${details.permalink}`)
      }
    } catch (error) {
      setSubmissionFailure("An error has occurred.")
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form className="flex flex-col gap-5" onSubmit={submitAction}>
        <div className="flex flex-col gap-5 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Subject"
            required
            id="subject"
            className="flex-1"
            onChange={(e) =>
              setDataForm((prevState) => ({
                ...prevState,
                subject: e.target.value,
              }))
            }
            value={dataForm.subject}
          />
          <Select
            onChange={(e) =>
              setDataForm((prevState) => ({
                ...prevState,
                products: e.target.value,
              }))
            }
            value={dataForm.products}
          >
            <option value="uncategorized">Select a Production Line</option>
            <option value="biscuitline ">Biscuit Line</option>
            <option value="waferbiscuit">Wafer Biscuit</option>
            <option value="flourline">Flour Line</option>
            <option value="noodelsline">Noodels Line</option>
            <option value="macaroniline">Macaroni Line</option>
            <option value="pastaline">Pasta Line</option>
          </Select>
        </div>
        <div className="flex gap-5 items-center justify-between border-4 border-yellow-600 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Button
            type="button"
            size="sm"
            className="bg-gradient-to-r from-red-400 to-yellow-400"
            onClick={imageUploadProcessor}
            disabled={uploadProgress}
          >
            {uploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={uploadProgress}
                  text={`${uploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {uploadError && <Alert color="failure">{uploadError}</Alert>}
        {dataForm.image && <img src={dataForm.image} alt="Uploaded" />}
        <ReactQuill
          theme="snow"
          value={dataForm.content}
          onChange={(value) =>
            setDataForm((prevState) => ({
              ...prevState,
              content: value,
            }))
          }
        />
        {submissionFailure && (
          <Alert color="failure">{submissionFailure}</Alert>
        )}
        <Button
          type="submit"
          className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 text-white py-1 px-3 rounded-lg
              hover:from-pink-500 hover:via-red-500 hover:to-yellow-500"
        >
          Update Post
        </Button>
      </form>
    </div>
  )
}
