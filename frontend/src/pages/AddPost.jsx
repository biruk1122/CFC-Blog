import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import React from "react"
import { useState } from "react"
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
import { useNavigate } from "react-router-dom"

export default function AddPost() {
  const [imageFile, setImageFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [dataForm, setDataForm] = useState({})
  const redirect = useNavigate()
  const [submissionFailure, setSubmissionFailure] = useState(null)

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
            setDataForm({ ...dataForm, image: downloadURL })
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
    try {
      const res = await fetch("/api/post/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      })
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
      <h1 className="text-center text-3xl my-7 font-semibold">Add a Post</h1>
      <form className="flex flex-col gap-5" onSubmit={submitAction}>
        <div className="flex flex-col gap-5 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Subject"
            required
            id="subject"
            className="flex-1"
            onChange={(e) =>
              setDataForm({ ...dataForm, subject: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setDataForm({ ...dataForm, products: e.target.value })
            }
          >
            <option value="uncategorized">Select a Production Line</option>
            <option value="Biscuit Line ">Biscuit Line</option>
            <option value="Wafer Biscuit">Wafer Biscuit</option>
            <option value="Flour Line">Flour Line</option>
            <option value="Noodels Line">Noodels Line</option>
            <option value="Macaroni Line">Macaroni Line</option>
            <option value="Pasta Line">Pasta Line</option>
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
        {dataForm.image && (
          <img
            src={dataForm.image}
            alt="image"
            className="w-full h-50 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Type your message..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setDataForm({ ...dataForm, content: value })
          }}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-red-400 to-yellow-400"
        >
          Post
        </Button>
        {submissionFailure && (
          <Alert className="mt-4" color="failure">
            {submissionFailure}
          </Alert>
        )}
      </form>
    </div>
  )
}
