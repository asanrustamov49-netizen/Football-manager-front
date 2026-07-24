"use client";
import EditPlayer from "@/components/pages/edit-player/Edit-Player";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  console.log(id);
  return <EditPlayer />;
};

export default page;
