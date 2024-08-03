'use client' // fix error useAuth
import { RiNextjsFill } from "react-icons/ri";
import Storage from "@mui/icons-material/StorageRounded";
import ChangeHistory from "@mui/icons-material/ChangeHistoryRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
export default function Home() {
  return (
    <div className="proppins">
      <Navbar />
      <CTASection />
      <Features />
    </div>
  );
}
function Navbar() {
  return (
    <nav className="flex m-5 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col">
      <Logo />
      <Buttons />
    </nav>
  );
}
function Logo() {
  return (
    <div className="flex gap-2 items-center">
      {/* Icon Container */}
      <div
        className={`bg-sky-500 flex items-center justify-center p-[6px] rounded-md `}
      >
        {/* Icon */}
        <div className="w-[26px] h-[26px] items-center justify-center flex">
          <RiNextjsFill className=" text-white text-[22px]" />
        </div>
      </div>
      {/* App Name * */}
      <div className="flex gap-1 text-[22px]">
        <span className='font-bold text-sky-500'>Next</span>
        <span className="text-slate-600">Component</span>
      </div>
    </div >
  );
}

function Buttons() {
  const { userId } = useAuth();
  return (
    <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
      {!userId ? (
        <>
          <Link href="/sign-in">
            <button
              aria-label="Sign In"
              className="max-sm:w-full text-sm border border-sky-500 text-white bg-sky-500 p-[8px] px-6 rounded-md">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button
              aria-label="Sign Up"
              className="max-sm:w-full text-sm border border-sky-500 text-blue-500 hover:bg-sky-500 hover:text-white p-[8px] px-6 rounded-md">
              Sign Up
            </button>
          </Link>
        </>
      ) : (
        <Link href="/dashboard">
          <button
            aria-label="Dashboard"
            className="max-sm:w-full text-sm border border-sky-500 text-white bg-sky-500 p-[8px] px-6 rounded-md">
            Dashboard
          </button>
        </Link>
      )}
    </div>
  );
}

function CTASection() {
  return (
    <div className="flex flex-col mx-16 items-center mt-[120px] gap-6 ">
      {/* */}
      <h2 className="font-bold text-2x1 text-center">
        Manage and create your component
        <span className={`text-sky-500`}> let do it!</span>
      </h2>
      {/* */}
      <p className="text-center text-[15px] w-[510px] max-sm:w-full text-slate-500">
        Save time by reusing your favorite components. Store them in a
        centralized database and create new components with ease. Enhance your
        development workflow by having quick access to a library of reusable
        components and ensure consistency across your projects.
      </p>
      <button
        className={`block bg-sky-500 rounded-md px-9 py-3 text-sm font-medium text-white ☐hover:bg-sky-600 `}
        type="button"
      >
        {`Let's get started!`}
      </button>
    </div>
  );
}

function Features() {
  const features = [
    {
      id: 1,
      name: "Centralized Component Library",
      icon: <Storage className="text-sky-500 text-[32px]" />,
      description: `Organize all your React components in a centralized library.
  Easily browse, search, and access your saved components whenever
  you need them`,
    },
    {
      id: 2,
      name: "Reusable Components",
      icon: <CodeRounded className="text-sky-500 text-[32px]" />,
      description: `Create and edit your React components directly within our
intuitive editor.Write JSX code with syntax highlighting and
instant previews.`,
    },
    {
      id: 3,
      name: "Version Control and History",
      icon: <ChangeHistory className="text-sky-500 text-[32px]" />,
      description: `Track changes and maintain different versions of your
components.Revert to previous versions if needed and keep a
history of modifications.`
    },
  ];
  return (
    <section className=" py-12 bg-slate-50 mt-12">
      <div className=" mx-auto px-4 ">
        <h2 className="text-2x1 font-bold text-center">Key Features</h2>
        {/* */}
        <div className="mt-12 grid grid-cols-1 md: grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className=" p-6 bg-white rounded-lg shadow-sm flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full items-center justify-center flex bg-sky-100">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-sky-500 mt-6 text-center">
                {feature.name}
              </h3>
              <p className="text-slate-600 text-[13px] mt-2 text-center w-[80%]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
