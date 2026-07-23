"use client"
import EditTeam from "@/components/pages/edit-team/Edit-Team";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  console.log(id);
  return <EditTeam />;
};

export default page;
