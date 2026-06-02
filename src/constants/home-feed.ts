import { type ImageSourcePropType } from "react-native";

export type HomeFeedItem = {
  id: string;
  image: ImageSourcePropType;
};

export type HomeFeedListItem = HomeFeedItem & {
  key: string;
};

const PLACEHOLDER_IMAGE = require("@/assets/images/placeholder.png");

const PLACEHOLDER_IMAGES = [
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_IMAGE,
] satisfies ImageSourcePropType[];

function shuffle<T>(items: T[]) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[randomIndex]] = [
      nextItems[randomIndex],
      nextItems[index],
    ];
  }

  return nextItems;
}

export function createHomeFeed(repeatCount = 9): HomeFeedListItem[] {
  return Array.from({ length: repeatCount }, (_, repeatIndex) =>
    shuffle(PLACEHOLDER_IMAGES).map((image, imageIndex) => ({
      id: `placeholder-${repeatIndex}-${imageIndex}`,
      key: `placeholder-${repeatIndex}-${imageIndex}`,
      image,
    })),
  ).flat();
}
