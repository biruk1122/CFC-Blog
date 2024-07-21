import { Footer } from "flowbite-react"
import React from "react"
import { Link } from "react-router-dom"
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsTelegram,
} from "react-icons/bs"

export default function FooterSection() {
  return (
    <Footer
      container
      className="pt-5 pb-5 border border-t-8 border-teal-500  dark:bg-gray-900 text-gray-800 dark:text-white"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Logo and links section */}
        <div className="flex flex-wrap justify-between items-center mb-10">
          <div className="flex items-center mb-6 sm:mb-0">
            <Link
              to="/home"
              className="text-2xl font-bold text-gray-800 dark:text-white"
            >
              <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                CFC Daily
              </span>
              Blog
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Divider */}
        <Footer.Divider className="border-gray-300 dark:border-gray-700" />

        {/* Footer content */}
        <div className="flex flex-wrap justify-between mt-10">
          <div className="w-full sm:w-auto mb-6 sm:mb-0">
            <Footer.Title title="About" className="text-lg font-semibold" />
            <Footer.LinkGroup col className="space-y-2 mt-2">
              <Footer.Link
                href="https://www.chilalofoodcomplex.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                CFC Main Website
              </Footer.Link>
              <Footer.Link
                href="https://www.chilalofoodcomplex.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                CFC's Blog
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div className="w-full sm:w-auto mb-6 sm:mb-0">
            <Footer.Title title="Follow Us" className="text-lg font-semibold" />
            <Footer.LinkGroup col className="space-y-2 mt-2">
              <Footer.Link
                href="https://www.github.com/biruk1122"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Footer.Link>
              <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div className="w-full sm:w-auto">
            <Footer.Title title="Legal" className="text-lg font-semibold" />
            <Footer.LinkGroup col className="space-y-2 mt-2">
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>

        {/* Divider */}
        <Footer.Divider className="border-gray-300 dark:border-gray-700 my-10" />

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Footer.Copyright
            href="#"
            by="Biruk Fikadu"
            year={new Date().getFullYear()}
            className="mb-4 sm:mb-0"
          />
          <div className="flex space-x-4">
            <Footer.Icon
              href="#"
              icon={BsGithub}
              className="hover:text-gray-400 dark:hover:text-gray-500"
            />
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              className="hover:text-gray-400 dark:hover:text-gray-500"
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              className="hover:text-gray-400 dark:hover:text-gray-500"
            />
            <Footer.Icon
              href="#"
              icon={BsTelegram}
              className="hover:text-gray-400 dark:hover:text-gray-500"
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
              className="hover:text-gray-400 dark:hover:text-gray-500"
            />
          </div>
        </div>
      </div>
    </Footer>
  )
}
