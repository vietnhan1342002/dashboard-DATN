'use client'

import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { useRouter } from "next/navigation";


export default function Home() {
  return (
    <main className="container mx-auto flex">
      <Sidebar />
      <Dashboard />
    </main>
  );
}
