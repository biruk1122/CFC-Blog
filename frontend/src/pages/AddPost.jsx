import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"



const [imageFile, setImageFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(null)


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




export default function AddPost() {
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
        }