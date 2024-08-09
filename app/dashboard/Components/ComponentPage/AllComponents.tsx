import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { SiJavascript } from "react-icons/si";
import {
    materialDark,
    materialLight,
    atomDark,
    oneDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function AllComponents() {
    return (
        <div className="mt-5 flex flex-wrap gap-5">
            <SingleNote />
            <SingleNote />
            <SingleNote />
            <SingleNote />
        </div>
    );
}
export default AllComponents;

function SingleNote() {
    interface CodeBlockProps {
        language: string;
    }
    const CodeBlock: React.FC<CodeBlockProps> = ({ language }) => {
        const codeString = `>>> from decimal import Decimal
>>> from fractions import Fraction

>>> # Sum floating-point numbers
>>> sum([10.2, 12.5, 11.8])
34.5
>>> sum([10.2, 12.5, 11.8, float("inf")])
inf
>>> sum([10.2, 12.5, 11.8, float("nan")])
nan

>>> # Sum complex numbers
>>> sum([3 + 2j, 5 + 6j])
(8+8j)

>>> # Sum Decimal numbers
>>> sum([Decimal("10.2"), Decimal("12.5"), Decimal("11.8")])
Decimal('34.5')

>>> # Sum Fraction numbers
>>> sum([Fraction(51, 5), Fraction(25, 2), Fraction(59, 5)])
Fraction(69, 2)`;

        return (
            <div className="rounded-md overflow-hidden h-[250px]">
                <div className="h-full overflow-y-auto p-2 custom-scroll">
                    <SyntaxHighlighter language={language} style={oneDark}>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    };
    return (
        <div className="max-sm:w-full w-[320px] rounded-md py-4 bg-white">
            <NoteHeader />
            <NoteDate />
            <NoteTags />
            <NoteDescription />
            <CodeBlock language="javascript" />
            <NoteFooter />
        </div>
    );
    function NoteHeader() {
        return (
            <div className="flex justify-between mx-4">
                <span className="font-bold text-lg w-[87%]">
                Summing Numeric Values
                </span>
                <FavoriteBorderOutlinedIcon className="text-slate-400 cursor-pointer" />
            </div>
        );
    }
    function NoteTags() {
        return (
            <div className="text-slate-500 text-[11px] mx-4 flex-wrap flex gap-1 mt-4">
                <span className="bg-sky-100 text-purple-600 p-1 rounded-md px-2">
                    functions
                </span>
                <span className="bg-sky-100 text-purple-600 p-1 rounded-md px-2">
                    functions
                </span>
                <span className="bg-sky-100 text-purple-600 p-1 rounded-md px-2">
                    functions
                </span>
                <span className="bg-sky-100 text-purple-600 p-1 rounded-md px-2">
                    functions
                </span>
            </div>
        );
    }
    function NoteDate() {
        return (
            <div className="text-slate-500 text-[11px] flex gap-1 font-light mx-4 mt-1">
                <span>23rd June 2024</span>
            </div>
        );
    }
    function NoteDescription() {
        return (
            <div className="text-slate-600 text-[13px] mt-4 mx-4">
               The primary purpose of sum() is to provide a Pythonic way to add numeric values together. Up to this point, you’ve seen how to use the function to sum integer numbers. Additionally, you can use sum() with any other numeric Python types, such as float, complex, decimal.Decimal, and fractions.Fraction.
            </div>
        );
    }
    function NoteFooter() {
        return (
            <div className="flex justify-between text-[13px] text-slate-400 mx-4 mt-3">
                <div className="flex gap-1 items-center">
                    <SiJavascript size={15} className="mb-[2px]" />
                    Javascript
                </div>
                <DeleteRoundedIcon sx={{ fontSize: 17 }} className="cursor-pointer" />
            </div>
        );
    }
}
