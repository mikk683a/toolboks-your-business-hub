import StorySection from "@/components/story/StorySection";
import ComingSoon from "@/components/story/ComingSoon";
import { TUESDAY_STORY, TuesdayMock } from "@/components/story/tuesday";

/** One running story instead of three separate ones: a whole day, six scenes, one phone. */
export const TuesdayStory = () => (
  <StorySection
    {...TUESDAY_STORY}
    phoneState={(a) => ({ tab: a === 0 || a === 4 ? 2 : a === 5 ? 3 : 1, notify: a === 1, badge: a === 1 ? 1 : 0 })}
    renderMock={(a) => <TuesdayMock active={a} />}
  />
);

export const ComingSoonSection = () => (
  <section id="paa-vej" className="py-16 lg:py-24 bg-secondary/30" aria-labelledby="paa-vej-title">
    <div className="container mx-auto px-4">
      <header className="mb-10 max-w-2xl">
        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">På vej</span>
        <h2 id="paa-vej-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Det arbejder vi på
        </h2>
        <p className="text-lg text-muted-foreground">
          Det her findes ikke endnu. Vi viser, hvad vi arbejder på, men vi lover ingen datoer.
        </p>
      </header>
      <ComingSoon />
    </div>
  </section>
);
