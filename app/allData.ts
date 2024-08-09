import { v4 as uuidv4 } from 'uuid';
export interface AppComponent {
    _id: string;
    name: string;
    projectName: string;
    code: string;
    tag: string[];
    desc: string;
    isFavorite: boolean;
    createdAt: string;
}
export interface Project {
    _id: string;
    clerkUserId: string;
    name: string;
    icon: string;
    createdAt: string;
    components: AppComponent[];
}

export const allProjectsData: Project[] = [
    {
        _id: uuidv4(),
        clerkUserId: "",
        name: "Forms",
        icon: "JavaScript",
        createdAt: "2022-01-01T00:00:00.000Z",
        components: [
            {
                _id: uuidv4(),
                name: "Form 1",
                projectName: "Forms",
                tag: ["hash map", "function"],
                desc: "The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers.",
                code: "",
                isFavorite: false,
                createdAt: "2022-01-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Form 2",
                projectName: "Forms",
                tag: ["tree", "function"],
                desc: "The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers.",
                code: "",
                isFavorite: false,
                createdAt: "2022-02-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Form 3",
                projectName: "Forms",
                tag: ["fix", "function"],
                desc: "The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers.",
                code: "",
                isFavorite: false,
                createdAt: "2022-02-01T00:00:00.000Z",
            },
        ],
    }, {
        _id: uuidv4(),
        clerkUserId: "",
        name: "Compo",
        icon: "TypeScript",
        createdAt: "2022-01-01T00:00:00.000Z",
        components: [
            {
                _id: uuidv4(),
                name: "Form 1",
                projectName: "Forms",
                tag: ["feat", "function"],
                desc: "The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers.",
                code: `def removeElement(nums, val):
    k = 0  # Initialize k to 0

    for i in range(len(nums)):
        if nums[i] != val:
            nums[k] = nums[i]
            k += 1

    # Optional: Fill the rest of the list with underscores for clarity
    for i in range(k, len(nums)):
        nums[i] = '_'

    return k`,
                isFavorite: false,
                createdAt: "2022-01-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Form2",
                projectName: "Button",
                tag: ["fix", "function"],
                desc: "The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers.",
                code: `
                function Features() {
  const features = [
    {
      id: 1,
      name: "Centralized Component Library",
      icon: <div className="text-sky-500 text-[32px]" />,
      description: "Organize all your React components in a centralized library.
  Easily browse, search, and access your saved components whenever
  you need them",
    },
    {
      id: 2,
      name: "Reusable Components",
      icon: <div className="text-sky-500 text-[32px]" />,
      description: "Create and edit your React components directly within our
intuitive editor.Write JSX code with syntax highlighting and
instant previews.",
    },
    {
      id: 3,
      name: "Version Control and History",
      icon: <div className="text-sky-500 text-[32px]" />,
      description: "Track changes and maintain different versions of your
components.Revert to previous versions if needed and keep a
history of modifications."
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
`,
                isFavorite: false,
                createdAt: "2022-02-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Form2",
                projectName: "Button",
                tag: ["fix", "function"],
                desc: "The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers.",
                code: `function Logo() {
  return (
    <div className="flex gap-2 items-center">
      {/* Icon Container */}
      <div className="bg-sky-500 flex items-center justify-center p-[6px] rounded-md">
        {/* Icon */}
        <div className="w-[26px] h-[26px] items-center justify-center flex">
        </div>
      </div>
      {/* App Name * */}
      <div className="flex gap-1 text-[22px]">
        <span className="font-bold text-sky-500">Next</span>
        <span className="text-slate-600">Component</span>
      </div>
    </div>
  );`,
                isFavorite: false,
                createdAt: "2022-02-01T00:00:00.000Z",
            },
        ],
    }
]