export default function Profile() {
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
