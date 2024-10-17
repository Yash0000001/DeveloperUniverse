"use client";
import { AuroraBackgroundDemo } from "@/components/Aurora";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import discord from "@/app/discord.png"

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col p-8 pt-20 bg-[#120727]">
      {/* section 1 */}
      <div className="flex flex-row w-full mb-20 mt-20">
        <div className="flex flex-col w-1/2">
          <div className="text-5xl leading-snug mb-7 font-bold">
            Welcome to{" "}
            <span className="text-[#A78BFA] drop-shadow-white-md">
              Developer Universe
            </span>
            🤖
          </div>
          <div className="text-xl mb-7">
            <span className="text-4xl">W</span>here Developers Connect,
            Collaborate, and Grow
          </div>
          <div className="text-md mb-7">
            Step into the universe of developers, where ideas ignite,
            collaboration thrives, and coding excellence is celebrated. Whether
            you are a seasoned pro or a budding coder, Developer Universe is
            your space to learn, build, and leave your mark.
          </div>
          <div
            className="text-xl bg-[#A78BFA] hover:drop-shadow-white-md rounded-full px-4 py-6 w-3/4 flex items-center justify-center cursor-pointer"
            onClick={() => router.push("/events")}
          >
            Join the Community | Explore Events
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <iframe
            src="https://my.spline.design/rocket-c7e1ace2a9ac9dc42548bc5764bed90a/"
            title="rocket"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>

      {/* section 2 */}
      <div className="flex flex-col items-center w-full mb-16">
        <div className="text-5xl leading-snug mb-4 text-[#A78BFA] drop-shadow-white-md font-bold">
          What we have for You?
        </div>
        <div className="text-xl leading-snug mb-16">
          Explore the Key Features of Developer Universe
        </div>
        <div className="flex flex-row w-full mb-16 gap-8 items-center border-t-2 p-8 border-r-2">
          <div className="flex flex-col w-1/2 relative z-0">
            <div className="absolute -top-10 left-10 w-1/2 aspect-square -z-10 opacity-40 bg-red-400 rounded-full blur-3xl"></div>
            <div className="text-xl mb-7">
              <span className="text-3xl text-[#A78BFA] drop-shadow-white-md">
                Leaderboard:{" "}
              </span>{" "}
              Rank Up. Stand Out.
            </div>
            <div className="text-lg">
              <ol>
                <li>
                  Push your limits, climb the ranks, and earn recognition for
                  your contributions. Compete with fellow developers and
                  showcase your coding prowess.
                </li>
                <li>
                  {" "}
                  Immerse yourself so deeply in your code that even you get
                  lost, but only during coding sessions—outside of that, do
                  whatever makes you feel great!
                </li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col w-1/2 max-w-xs md:max-w-md lg:max-w-lg mx-auto">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[35rem] h-auto rounded-xl p-8 border  ">
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="https://media.istockphoto.com/id/1451170259/photo/wooden-blocks-with-score-text-of-concept-and-a-human-toy.webp?a=1&b=1&s=612x612&w=0&k=20&c=Vgdqsf6Agsd3lNyBsLt9Kz-0thsJmVgOd9vA7Xw8VLo="
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>

        <div className="flex flex-row-reverse w-full mb-16 gap-8 items-center border-t-2 p-8 border-l-2">
          <div className="flex flex-col w-1/2 relative z-0">
            <div className="absolute -top-10 left-10  w-1/2 aspect-square -z-10 opacity-40 bg-green-500 rounded-full blur-3xl"></div>
            <div className="text-xl mb-7">
              <span className="text-3xl text-[#A78BFA] drop-shadow-white-md">
                Events:{" "}
              </span>{" "}
              Learn. Compete. Network.
            </div>
            <div className="text-lg">
              <ol>
                <li>
                  From hackathons to expert talks, Developer Universe brings
                  events that keep you at the cutting edge of technology. Stay
                  updated, participate, and network with the brightest minds.
                </li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col w-1/2 max-w-xs md:max-w-md lg:max-w-lg mx-auto">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[35rem] h-auto rounded-xl p-8 border  ">
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>

        <div className="flex flex-row w-full mb-16 gap-8 items-center border-t-2 p-8 border-r-2">
          <div className="flex flex-col w-1/2 relative z-0">
            <div className="absolute -top-10 left-10  w-1/2 aspect-square -z-10 opacity-40 bg-white rounded-full blur-3xl"></div>
            <div className="text-xl mb-7">
              <span className="text-3xl text-[#A78BFA] drop-shadow-white-md">
                Profile Section:{" "}
              </span>{" "}
              Your Developer Journey, Your Way
            </div>
            <div className="text-lg">
              <ol>
                <li>
                  Track your progress, showcase your skills, and personalize
                  your developer profile. A space to feature your journey,
                  achievements, and future goals.
                </li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col w-1/2 max-w-xs md:max-w-md lg:max-w-lg mx-auto">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[35rem] h-auto rounded-xl p-8 border  ">
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>

        <div className="flex flex-row-reverse w-full mb-16 gap-8 items-center border-t-2 p-8 border-l-2">
          <div className="flex flex-col w-1/2 relative z-0">
            <div className="absolute -top-10 left-10  w-1/2 aspect-square -z-10 opacity-40 bg-yellow-500 rounded-full blur-3xl"></div>
            <div className="text-xl mb-7">
              <span className="text-3xl text-[#A78BFA] drop-shadow-white-md">
                Discussion Forum:{" "}
              </span>{" "}
              Engage in Real-time Conversations
            </div>
            <div className="text-lg">
              <ol>
                <li>
                  Got questions? Ideas to share? Our vibrant forum is where
                  developers unite to discuss, collaborate, and solve problems
                  together.
                </li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col w-1/2 max-w-xs md:max-w-md lg:max-w-lg mx-auto">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[35rem] h-auto rounded-xl p-8 border  ">
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </div>

      {/* section 3 */}
      <div className="mb-16">
        <AuroraBackgroundDemo />
      </div>

      {/* section 4 */}
      <div className="mb-16 flex flex-row gap-8">
        <div className="flex flex-col w-1/2">
          <div className="text-5xl leading-snug mb-4 font-bold">
            Experience the{" "}
            <span className="text-[#A78BFA] drop-shadow-white-md font-bold">
              Developer Universe Community
            </span>
          </div>
          <div className="font-semibold text-xl mb-7">
            <span className="text-[#A78BFA]">Join</span> for quests, support,
            memes, and more!
          </div>
          <div className="text-xl bg-[#A78BFA] hover:drop-shadow-white-md rounded-full px-4 py-6 w-3/4 flex items-center justify-center cursor-pointer">
            Join Our Discord Server
          </div>
        </div>
        <div className="w-1/2 ">
          <Image
          src={discord}
          title="Discord"
          width={500}
          height={500}
          alt="Discord Image"
          className="rounded-md opacity-70"
          />
        </div>
      </div>
    </div>
  );
}
