import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { type HomeFeedListItem } from "../../constants/home-feed";

export default function FeedCard({
  item,
  index,
  scrollY,
  pageExtent,
  cardWidth,
  cardHeight,
  isWideLayout,
  actionsheetProps,
}: {
  item: HomeFeedListItem;
  index: number;
  scrollY: SharedValue<number>;
  pageExtent: number;
  cardWidth: number;
  cardHeight: number;
  isWideLayout: boolean;
  actionsheetProps: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    item: HomeFeedListItem;
  };
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const distance = index * pageExtent - scrollY.value;
    const absDistance = Math.abs(distance);

    return {
      opacity: interpolate(
        absDistance,
        [0, pageExtent * 0.14, pageExtent * 0.3],
        [1, 0.22, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          scale: interpolate(
            absDistance,
            [0, pageExtent * 0.18, pageExtent * 0.4],
            [1, 0.99, 0.96],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            distance,
            [-pageExtent, 0, pageExtent],
            [18, 0, -18],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.page, animatedStyle, { height: pageExtent }]}>
      <View
        style={[styles.cardStage, { width: cardWidth, height: cardHeight }]}
      >
        <View
          style={[
            styles.card,
            {
              width: cardWidth,
              height: cardHeight,
            },
          ]}
        >
          <Image
            source={item.image}
            style={styles.cardImage}
            contentFit="cover"
          />

          <Text style={styles.chevron}>⌄</Text>
        </View>

        <CardActions
          isWideLayout={isWideLayout}
          cardHeight={cardHeight}
          actionsheetProps={actionsheetProps}
        />
      </View>
    </Animated.View>
  );
}

function CardActions({
  isWideLayout,
  cardHeight,
  actionsheetProps,
}: {
  isWideLayout: boolean;
  cardHeight: number;
  actionsheetProps: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    item: HomeFeedListItem;
  };
}) {
  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.actionsAnchor,
        isWideLayout ? styles.actionsAnchorWide : styles.actionsAnchorRow,
      ]}
    >
      <View
        style={[
          styles.actionsRow,
          isWideLayout
            ? [
                styles.actionsRowWide,
                { top: Math.max(0, cardHeight / 2 - 108) },
              ]
            : styles.actionsRowCompact,
        ]}
      >
        <ActionButton icon={require("@/assets/icons/Like.svg")} />
        <ActionButton icon={require("@/assets/icons/Edit.svg")} />
        <ActionButton
          icon={require("@/assets/icons/Tag.svg")}
          actionsheetProps={actionsheetProps}
        />
      </View>
    </View>
  );
}

function ActionButton({
  icon,
  actionsheetProps,
}: {
  icon: any;
  actionsheetProps?: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    item: HomeFeedListItem;
  };
}) {
  return (
    <Pressable
      style={styles.actionButton}
      onPress={() => actionsheetProps?.onOpenChange(true)}
    >
      <Image source={icon} style={styles.actionIcon} contentFit="contain" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardStage: {
    position: "relative",
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FEFDE4",
  },
  cardImage: {
    ...StyleSheet.absoluteFill,
  },
  chevron: {
    position: "absolute",
    bottom: -38,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 28,
    color: "#D9CFAF",
  },
  actionsAnchor: {
    position: "absolute",
    zIndex: 15,
    width: "80%",
    height: "100%",
    overflow: "visible",
  },
  actionsAnchorRow: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  actionsAnchorWide: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    alignItems: "flex-end",
  },
  actionsRow: {
    overflow: "visible",
  },
  actionsRowCompact: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: -30,
  },
  actionsRowWide: {
    flexDirection: "column",
    columnGap: 0,
    rowGap: 18,
    paddingHorizontal: 0,
    width: "auto",
    position: "absolute",
    right: -30,
  },
  actionButton: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    backgroundColor: "#FEFDE4",
    boxShadow: "0px 1px 3px rgba(239, 225, 174, 1)",
    elevation: 5,
  },
  actionIcon: {
    width: 30,
    height: 30,
  },
});
