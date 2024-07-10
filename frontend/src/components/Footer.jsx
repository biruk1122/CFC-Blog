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
    <Footer container className=" pt-5 pb-5 border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        {/*div that cover logo and other */}
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-6">
            <Link
              to="/home"
              className=" self-center whitespace-nowrap text-lg sm:text-xl
            font-semibold dark:text-white"
            >
              <span
                className=" px-2 py-1  bg-gradient-to-r from-indigo-500 via-purple-500 
            to-pink-500 rounded-lg text-white"
              >
                CFC Daily
              </span>
              Blog
            </Link>
          </div>
          <div className="mb-10 grid grid-cols-3 gap-8 mt-4 sm:grid-col-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https:www.chilalofoodcomplex.com"
                  target="_blank"
                  rel="noopner noreferrer"
                >
                  CFC Main Website
                </Footer.Link>
                <Footer.Link
                  href="https:www.chilalofoodcomplex.com"
                  target="_blank"
                  rel="noopner noreferrer"
                >
                  cfc's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https:www.github.com/biruk1122">
                  Github
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopner noreferrer">
                  Linkidin
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className=" w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by=" Biruk Fikadu "
            year={new Date().getFullYear()}
          />
          <div className=" flex gap-6 sm:mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTelegram} />
            <Footer.Icon href="#" icon={BsTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  )
}
