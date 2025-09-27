import TopicText from "./TopicText";
import ContentBox from "./ContentBox";

function SearchBar(){
  return (
    <>
      
    </>
  )
}

function ContentContainer(){
  return (
    <div className="w-full h-fit p-5">
      <TopicText text="Content"></TopicText>
      <ContentBox date="22/21/22" topic_text="Competitve Programming" tags={["C", "C++"]} desc="kldsalkj dasd klasd asn dlkanslkd nasnd naslkndk alsnkld nas ndklas ndkas"></ContentBox>
      <ContentBox date="22/21/22" topic_text="Competitve Programming" tags={["C", "C++"]} desc="kldsalkj dasd klasd asn dlkanslkd nasnd naslkndk alsnkld nas ndklas ndkas"></ContentBox>
    </div>
  )
}

export default ContentContainer