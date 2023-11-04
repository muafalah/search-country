"use client";

import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

import { Button } from "./ui/button";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="mb-14">
      <Button type="button" variant="default" onClick={() => router.push("/")}>
        <MoveLeft className="mr-2 h-4 w-4" /> Back to Homepage
      </Button>
    </div>
  );
};

export default BackButton;
