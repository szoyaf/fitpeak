import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { type HomeFeedListItem } from "../../constants/home-feed";
import { Colors } from "../../constants/theme";

export default function FeedCard({
  item,
  index,
  scrollY,
  pageExtent,
  cardWidth,
  cardHeight,
  isWideLayout,
}: {
  item: HomeFeedListItem;
  index: number;
  scrollY: SharedValue<number>;
  pageExtent: number;
  cardWidth: number;
  cardHeight: number;
  isWideLayout: boolean;
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
              borderColor: "#d9cfaf",
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

        <CardActions isWideLayout={isWideLayout} cardHeight={cardHeight} />
      </View>
    </Animated.View>
  );
}

function CardActions({
  isWideLayout,
  cardHeight,
}: {
  isWideLayout: boolean;
  cardHeight: number;
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
        <ActionButton label="❤️" />
        <ActionButton label="✏️" />
        <ActionButton label="🏷️" />
      </View>
    </View>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <Pressable style={styles.actionButton}>
      <Text style={styles.actionIcon}>{label}</Text>
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
  },
  card: {
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "#efe4d2",
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
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  actionsAnchorRow: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  actionsAnchorWide: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
    backgroundColor: Colors.light.background,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.18)",
    elevation: 5,
  },
  actionIcon: {
    fontSize: 22,
  },
});
