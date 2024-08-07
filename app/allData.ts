import { v4 as uuidv4 } from 'uuid';
export interface AppComponent {
    _id: string;
    name: string;
    projectName: string;
    code: string;
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
                code: "",
                isFavorite: false,
                createdAt: "2022-01-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Form 2",
                projectName: "Forms",
                code: "",
                isFavorite: true,
                createdAt: "2022-02-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Form 3",
                projectName: "Forms",
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
                code: "",
                isFavorite: false,
                createdAt: "2022-01-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Button",
                projectName: "Button",
                code: "",
                isFavorite: true,
                createdAt: "2022-02-01T00:00:00.000Z",
            },
            {
                _id: uuidv4(),
                name: "Form 3",
                projectName: "Forms",
                code: "",
                isFavorite: false,
                createdAt: "2022-02-01T00:00:00.000Z",
            },
        ],
    }
]