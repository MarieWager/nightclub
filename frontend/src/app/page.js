import TitleLine from "./_components/TitleLine";
import Hero from "./_components/_home_comps/_hero_section/Hero";
import GalleryGrid from "./_components/GalleryGrid";

import MusicPlayer from "./_components/MusicPlayer";
import VideoPlayer from "./_components/VideoPlayer";
import Testimonials from "./_components/_home_comps/_testimonials_section/Testimonial";
import Welcome from "./_components/_home_comps/_welcome_section/Welcome";
import Events from "./_components/_home_comps/_event_section/Events";
import RecentBlogs from "./_components/_home_comps/_recentBlogs_section/RecentBlogs";

export default function Page() {
  return (
    <>
      <Hero />
      <TitleLine title="welcome in nightclub" className="place-self-center text-center" />
      <Welcome />
      <Events />
      <TitleLine title="night club gallery" className="place-self-center text-center" />
      <GalleryGrid />
      <h1 className="place-self-center text-center">night club track</h1>
      <MusicPlayer />
      <h1 className="place-self-center text-center">latest video</h1>
      <VideoPlayer />
      <Testimonials />
      <TitleLine title="recent blog" className="place-self-center text-center" />
      <RecentBlogs />
    </>
  );
}
