"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AddButton() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsAuth(!!token);
  }, []);

  if (!isAuth) return null;

  return (
    <div className="text-end mb-4">
      <Link href="/agregarproyecto" className="btn btn-success">
        Agregar Trabajo
      </Link>
    </div>
  );
}
