import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center bg-[#120727] pt-28 pb-8">
      <SignUp afterSignOutUrl={"/"}/>
    </div>
  );
}
