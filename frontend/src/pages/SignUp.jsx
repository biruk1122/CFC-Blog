import React from "react"

export default function SignUp() {
  return (
    // Render a div with classes for minimum screen height and top margin
    <div className="min-h-screen mt-20">
      {/* Render a flex container with specified layout and spacing */}
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6">
        {/* Render the left side content */}
        {/* Use flex-1 class to distribute remaining space evenly */}
        <div className="flex-1">
          {/* Render a link to the home page with specified styles */}
          <Link to="/" className="font-bold dark:text-white text-4xl">
            {/* Render a span with gradient background and text styles */}
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500 
          via-purple-500 to-pink-500 rounded-lg text-white"
            >
              CFC Daily
            </span>
            Blogs
          </Link>

          {/* Render a paragraph with specified styles and margin */}
          <p className="text-sm mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc
            urna, sagittis vehicula orci ac, varius posuere est. Vivamus laoreet
            nisl quis mauris dignissim blandit. Quisque porta laoreet diam eget
            aliquet.
          </p>
        </div>

        {/* Render the right side content */}

        {/* Use flex-1 class to distribute remaining space evenly */}
        <div className="flex-1">
          {/* Render a form with specified layout and spacing */}
          <form className="flex flex-col gap-6" onSubmit={submitAction}>
            <div>
              <Label value="username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={fieldChangeHandler}
                className="w-full"
              />
            </div>
            <div>
              <Label value="email" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={fieldChangeHandler}
                className="w-full"
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={fieldChangeHandler}
                className="w-full"
              />
            </div>
            {/* Render a button for form submission */}
            <Button
              type="submit"
              // Specify button styles with gradient background
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded 
              hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          {/* Render a div for additional text and link */}
          <div className="flex gap-2 text-sm mt-6">
            <span>Have an account?</span>
            {/* Render a link to sign-in page with specified styles */}
            <Link to="/sign-in" className="text-blue-700">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
