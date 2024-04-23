"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const Documents = () => {
  const { user } = useUser();

  console.log(user);

  return <div className="flex flex-col justify-center items-center h-full space-y-4">
    <Image
      src="/document-reading.svg"
      alt="document-reading"
      width="300"
      height="300"
      className="dark:hidden"
    />
    <Image
      src="/document-reading-dark.svg"
      alt="document-reading"
      width="300"
      height="300"
      className="hidden dark:block"
    />
    <h2 className="text-lg font-medium">Welcome {user?.firstName && user.firstName} to Ali Notion 📝</h2>
    <Button>
      <PlusCircle className="w-4 h-4 mr-2" />
      Create A Note
    </Button>
  </div>;
};

export default Documents;
