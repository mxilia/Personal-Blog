import ProfileContainer from "@/components/home/ProfileContainer";
import ContentContainer from "@/components/home/ContentContainer";

function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center absolute translate-[-50%] top-[50%] left-[50%] sm:w-140">
      <ProfileContainer></ProfileContainer>
      <ContentContainer/>
    </div>
  );
}

export default Home