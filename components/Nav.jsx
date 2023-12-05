"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const callProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };

  useEffect(() => {
    callProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          width={30}
          height={30}
          className="object-contain"
          alt="logo"
        />
        <p className="logo_text">Promptopia </p>
      </Link>

      {/* web navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3  md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="image"
              />
            </Link>
          </div>
        ) : (
          providers &&
          Object.values(providers).map((item) => (
            <button
              type="button"
              key={item.name}
              onClick={() => {
                signIn(item.id);
              }}
              className="black_btn"
            >
              Sign In
            </button>
          ))
        )}
      </div>

      {/* mobile navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex ">
            <Image
              src={"/assets/images/logo.svg"}
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
              alt="image"
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  className="mt-5 black_btn w-full"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers &&
          Object.values(providers).map((item) => (
            <button
              type="button"
              key={item.name}
              onClick={() => {
                signIn(item.id);
              }}
              className="black_btn"
            >
              Sign In
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default Nav;
