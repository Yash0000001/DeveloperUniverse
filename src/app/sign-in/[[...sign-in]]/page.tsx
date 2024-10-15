import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center  bg-[#120727] pt-28 pb-8 ">
      <SignIn afterSignOutUrl={"/"}/>
    </div>
  );
}
