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