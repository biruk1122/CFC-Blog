import { Alert, Button, Modal, TextInput } from "flowbite-react"
import React, { useEffect, useRef, useState } from "react"

export default function Profile() {
    return (
        const { currentUser, error } = useSelector((state) => state.user)
        const [image, setImage] = useState(null)
        const [imageUrl, setImageUrl] = useState(null)
        const [uploadProgress, setUploadProgress] = useState(null)

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
            
            )
          }

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
        ></Button>
        )
}
