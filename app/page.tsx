import ProfileContainer from "@/components/home/ProfileContainer";
import ContentContainer from "@/components/home/ContentContainer";

function Home() {
  return (
    <div className="w-170 h-full flex flex-col items-center absolute translate-[-50%] top-[50%] left-[50%]">
      <ProfileContainer></ProfileContainer>
      <ContentContainer></ContentContainer>
    </div>
  );
}

export default Home