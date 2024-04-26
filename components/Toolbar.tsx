"use client"

import { Doc } from "@/convex/_generated/dataModel";

interface ToolbarProps {
    initalData: Doc<"documents">;
    preview?: boolean;
}

const Toolbar = ({ initalData, preview}: ToolbarProps)=> {
    return <h1>test</h1>
};

export default Toolbar;