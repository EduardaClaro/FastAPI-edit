"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Kaisei_Decol } from "next/font/google";

const kaiseiDecol = Kaisei_Decol({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm">
      {/* Conteúdo centralizado */}
      <div className="flex items-center justify-between px-8 py-3">
        {/* Logo + Nome */}
        <div className="flex items-center gap-2 ml-20">
          <Image
            src="/assets/logo.png"
            alt="Logo FastEdit"
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className={`${kaiseiDecol.className} font-medium text-black text-lg`}>
            FastEdit
          </span>
        </div>
 
        {/* Links */}
        <div className="flex items-center gap-12 mr-25">
          <Link
            href="/upload"
            className={`${kaiseiDecol.className} text-sm text-black hover:text-purple-700 transition-colors`}
          >
            Upload
          </Link>
        </div>
      </div>
    </nav>
  );
}
