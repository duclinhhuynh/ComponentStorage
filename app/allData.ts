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
        icon: "categoryIcon",
        createdAt: "2022-01-01T00:00:00.000Z",
        components: [
            {
                _id: uuidv4(),
                name: "Form 1",
                projectName: "Forms",
                tag: ["hash map","function"],
                desc: "The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers.",
                code: "",
                isFavorite: false,
                createdAt: "2022-01-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Form 2",
                projectName: "Forms",
                tag: ["tree","function"],
                desc: "The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers.",
                code: "",
                isFavorite: false,
                createdAt: "2022-02-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Form 3",
                projectName: "Forms",
                tag: ["fix","function"],
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
        icon: "categoryIcon",
        createdAt: "2022-01-01T00:00:00.000Z",
        components: [
            {
                _id: uuidv4(),
                name: "Form 1",
                projectName: "Forms",
                tag: ["feat","function"],
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
                tag: ["fix","function"],
                desc: "The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers.",
                code: `function removeElement(nums, val) {
    let k = 0;  // Initialize k to 0

    // Loop through the array
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i];  // Place the element at index k
            k++;  // Increment k
        }
    }

    // Optional: Fill the rest of the array with underscores for clarity
    for (let i = k; i < nums.length; i++) {
        nums[i] = '_';
    }

    return k;  // Return the new length k
}`,
                isFavorite: true,
                createdAt: "2022-02-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Form 3",
                projectName: "Forms",
                tag: ["fix","function"],
                desc: "The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers.",
                code: "",
                isFavorite: false,
                createdAt: "2022-02-01T00:00:00.000Z",
            },
        ],
    }
]