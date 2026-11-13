import StorySection from "@/components/story/StorySection";
import ComingSoon from "@/components/story/ComingSoon";
import { DayMock, FlowMock, InboxMock } from "@/components/story/mocks";
import { DAY_STORY, FLOW_STORY, INBOX_STORY } from "@/components/story/story-data";

export const InboxStory = () => (
  <StorySection {...INBOX_STORY} title="Alle beskeder lander i samme indbakke" renderMock={(a) => <InboxMock active={a} />} />
);
export const FlowStory = () => (
  <StorySection {...FLOW_STORY} tint renderMock={(a) => <FlowMock active={a} />} />
);
export const DayStory = () => (
  <StorySection {...DAY_STORY} renderMock={(a) => <DayMock active={a} />} />
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
