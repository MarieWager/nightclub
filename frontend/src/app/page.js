import TitleLine from "./_components/TitleLine";
import Hero from "./_components/_home_comps/_hero_section/Hero";
import GalleryGrid from "./_components/GalleryGrid";

import MusicPlayer from "./_components/MusicPlayer";
import VideoPlayer from "./_components/VideoPlayer";
import Testimonials from "./_components/_home_comps/_testimonials_section/Testimonial";



export default function Page() {
  return (
    <>
      <Hero />
      <TitleLine title="welcome in nightclub" className="place-self-center text-center" />
      <TitleLine title="events of the month" className="place-self-center text-center" />
      <TitleLine title="night club gallery" className="place-self-center text-center" />
      <GalleryGrid />
      <TitleLine title="night club track" className="place-self-center text-center" />
      <MusicPlayer />
      <TitleLine title="latest video" className="place-self-center text-center" />
      <VideoPlayer />
      <Testimonials />
      <TitleLine title="recent blog" className="place-self-center text-center" />
    </>
  );
}
