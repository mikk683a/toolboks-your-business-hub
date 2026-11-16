import StorySection from "@/components/story/StorySection";
import { TUESDAY_STORY, TuesdayMock } from "@/components/story/tuesday";

/** One running story: a whole day, six scenes, one phone that follows the scroll. */
export const TuesdayStory = () => (
  <StorySection
    {...TUESDAY_STORY}
    phoneState={(a) => ({ tab: a === 0 || a === 4 ? 2 : a === 5 ? 3 : 1, notify: a === 1, badge: a === 1 ? 1 : 0 })}
    renderMock={(a) => <TuesdayMock active={a} />}
  />
);
