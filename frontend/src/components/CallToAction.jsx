import { Button } from "flowbite-react"
import React from "react"

export default function CallToAction() {
  return (
    <div
      className="flex flex-col sm:flex-row p-4 border border-yellow-400 justify-center 
    items-center rounded-tl-3xl rounded-br-3xl text-center"
    >
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">One of Our Company Products</h2>
        <p className="text-gray-500 my-3">
          "I love having a warm biscuit with my morning coffee."
        </p>
        <Button
          class="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
        rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://chilalofoodcomplex.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center w-full"
          >
            You Want to Know More About Our Company
          </a>
        </Button>
      </div>
      <div className="p-8 flex-1">
        <img
          src="https://static.toiimg.com/thumb/62403305.cms?width=1200&height=600"
          alt="Biscuit"
          className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg "
        />
      </div>
    </div>
  )
}
