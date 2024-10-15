"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import white_on_trans from "@/app/white_on_trans.png";
import Image from "next/image";
const Navbar = () => {
  const { isLoaded, userId } = useAuth();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scroll
          ? "bg-white bg-opacity-10 backdrop-blur-lg border-b border-white/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <ul className="flex justify-between py-4 px-6">
        <div>
          <Link href="/">
            <li>
              <Image
                src={white_on_trans}
                alt="LOGO"
                width={80}
                height={80}
              ></Image>
            </li>
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <Link href={"/events"}>
            <li className="nav-item font-semibold">Events</li>
          </Link>
          <Link href={"/leaderboard"}>
            <li className="nav-item font-semibold">Leaderboard</li>
          </Link>
          <Link href={"/discussion"}>
            <li className="nav-item font-semibold">Discussion Forum</li>
          </Link>
          <Link href={"/dashboard"}>
            <li className="nav-item font-semibold">Dashboard</li>
          </Link>
        </div>
        {!userId || !isLoaded ? (
          <div className="flex gap-6 items-center">
            <Link href={"/sign-in"}>
              <li className="nav-item font-semibold">Login</li>
            </Link>
            <Link href={"/sign-up"}>
              <li className="nav-item font-semibold">Sign Up</li>
            </Link>
          </div>
        ) : (
          <div className="flex gap-6 items-center">
            <Link href={"/profile"}>
              <li className="nav-item font-semibold">Profile</li>
            </Link>
            <li className="flex items-center">
              <UserButton />
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
