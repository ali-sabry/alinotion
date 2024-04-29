"use client";

import Cover from "@/components/Cover";
import Editor from "@/components/Editor";
import Toolbar from "@/components/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentIdProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentId = ({ params }: DocumentIdProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <div>
      <Cover.Skeleton />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
        <div className="space-y-4 pl-8 pt-4">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    </div>;
  }

  if (document === null) {
    return <div>Not Found.</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initalData={document} />
        <Editor 
          onChange={ ()=> {}}
          // initalContent={document.content}
        />
      </div>
    </div>
  );
};

export default DocumentId;
