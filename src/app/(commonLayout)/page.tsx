import AboutUsHome from "@/src/components/AboutUsHome";
import Banner from "@/src/components/Banner";
import NewsLetter from "@/src/components/NewsLetter";
import ViewHomeCard from "@/src/components/ViewHomeCard";

export default function Home() {
  return (
   <>
     <Banner/>
     <AboutUsHome/>
     <ViewHomeCard/>
     <NewsLetter/>
   </>
  );
}
