"use client";

import { Doc } from "@/convex/_generated/dataModel";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote, useBlockNoteEditor } from "@blocknote/react";
import { useTheme } from "next-themes";

interface EditorProps {
    onChange: ()=> void;
    initalContent?: string;
    editable?: boolean
}

const Editor = ({onChange, initalContent, editable}: EditorProps)=> {
    // const editor: BlockNoteEditor = useBlockNoteEditor({
    //     editable,
    //     initalContent: initalContent ? JSON.parse(initalContent) as PartialBlock[] : undefined,
    //     onEditorContentChange: (editor)=> {
    //         onChange(JSON.parse(editor.topLevelBlock))
    //     },
    // })
    
    const { resolvedTheme } = useTheme();

    const editor = useBlockNoteEditor();

    return <BlockNoteView 
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        
    />
};

export default Editor;