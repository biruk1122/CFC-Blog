import { Alert, Button, Modal, TextInput } from "flowbite-react"
import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "../firebase"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import {
  updateStart,
  updateSuccess,
  updateFailure,
  initiateUserDeletion,
  userDeletionFailure,
  userDeletionSuccess,
  logOutSuccess,
} from "../App/user/userSlice"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { Link } from "react-router-dom"

export default function Profile() {
  const { currentUser, error } = useSelector((state) => state.user)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const imageRef = useRef()
  const dispatch = useDispatch()
  const [fileUpload, setFileUpload] = useState(false)
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(null)
  const [userUpdateError, setUserUpdateError] = useState(null)
  const [displayModal, setDisplayModal] = useState(false)

  const onImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImageUrl(URL.createObjectURL(file))
    }
  }
  useEffect(() => {
    if (image) {
      uploadFile()
    }
  }, [image])

  const uploadFile = async () => {
    setFileUpload(true)
    setUploadError(null)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name

    const storageRef = ref(storage, fileName)
    const fileUploadTask = uploadBytesResumable(storageRef, image)

    fileUploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setUploadError("File must be less than 3MB")

        setUploadProgress(null)
        setImage(null)
        setImageUrl(null)
        setFileUpload(false)
      },
      () => {
        getDownloadURL(fileUploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL)
          setFormData({ ...formData, avatar: downloadURL })
          setFileUpload(false)
        })
      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUserUpdateSuccess(null)
    setUserUpdateError(null)

    if (Object.keys(formData).length === 0) {
      setUserUpdateError("No modifications were made")
      return
    }

    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) {
        dispatch(updateFailure(data.message))
      } else {
        dispatch(updateSuccess(data))
        setUserUpdateSuccess("Update Successfull!")
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
    }
  }

  const manageRemoveUser = async () => {
    setDisplayModal(false)
    try {
      dispatch(initiateUserDeletion())
      console.log("Deleting user with ID:", currentUser._id) // Add this log
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) {
        dispatch(userDeletionFailure(data.message))
      } else {
        dispatch(userDeletionSuccess(data))
        console.log("User deletion success:", data) // Add this log
      }
    } catch (error) {
      dispatch(userDeletionFailure(error.message))
      console.error("Error deleting user:", error) // Add this log
    }
  }

  const logoutUser = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        dispatch(logOutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-5 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          ref={imageRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => imageRef.current.click()}
        >
          {uploadProgress && (
            <CircularProgressbar
              value={uploadProgress || 0}
              text={`${uploadProgress}%`}
              strokeWidth={4}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(75, 163, 145, ${uploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageUrl || currentUser.avatar}
            alt="user image"
            className={`rounded-full object-cover w-full  h-full border-8 border-[lightgray] ${
              uploadProgress && uploadProgress < 100 && "opacity-50"
            }`}
          />
        </div>
        {uploadError && <Alert color="failure">{uploadError}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="********"
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-red-400 to-yellow-400"
        >
          update
        </Button>
        {currentUser.administrator && (
          <Link to="/add-post">
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-red-400 to-yellow-400"
            >
              Add a new post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-700 flex justify-between mt-5">
        <span onClick={() => setDisplayModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={logoutUser} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {userUpdateSuccess && (
        <Alert color="success" className="mt-8">
          {userUpdateSuccess}
        </Alert>
      )}
      {userUpdateError && (
        <Alert color="failure" className="mt-8">
          {userUpdateError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-8">
          {error}
        </Alert>
      )}

      <Modal
        show={displayModal}
        onClose={() => setDisplayModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-12 w-12 text-red-600 dark:text-gray-300 mb-6 mx-auto" />
            <h2 className="mb-6 text-lg text-red-500 ">
              Are you certain you wish to permanently delete your account?
            </h2>
            <div className="flex justify-center gap-6">
              <Button color="failure" onClick={manageRemoveUser}>
                Yes
              </Button>
              <Button color="gray" onClick={() => setDisplayModal(false)}>
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
