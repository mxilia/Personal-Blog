import ProfileContainer from "@/components/ProfileContainer";
import ContentContainer from "@/components/ContentContainer";

export default function Home() {
  return (
      <div className="w-170 h-full flex flex-col items-center absolute translate-[-50%] top-[50%] left-[50%]">
        <ProfileContainer></ProfileContainer>
        <ContentContainer></ContentContainer>
      </div>
  );
}
