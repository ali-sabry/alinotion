"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";

import IconPicker from "./IconPicker";
import { ImageIcon, Smile, X } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import TextareaAutoSize from "react-textarea-autosize";

interface ToolbarProps {
  initalData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initalData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initalData.title);

  const update = useMutation(api.documents.update);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initalData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);

    update({
      id: initalData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initalData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon p-t-6">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl hover:opacity-75 transition">
              {initalData.icon}
            </p>
          </IconPicker>
          <Button
            className="rounded-full opacity-0 group-hover/icon:opacity-100 text-muted-foreground transition text-xs"
            variant="outline"
            onClick={() => {}}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {!!initalData.icon && preview && (
        <p className="text-6xl pt-6">{initalData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initalData.icon && !preview && (
          <IconPicker asChild onChange={() => {}}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="w-4 h-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initalData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={() => {}}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
        onClick={enableInput}
        className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] "
        >
          {initalData.title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
