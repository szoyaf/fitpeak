import { ThemedView } from "@/components/themed-view";
import { createHomeFeed } from "@/constants/home-feed";
import { Colors, Fonts } from "@/constants/theme";
import { useEffect, useMemo, useRef } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import FeedCard from "./feed-card";

export default function OriginalHomeScreen() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isWideLayout = width >= 640;
  const horizontalPadding = isTablet ? 40 : 24;
  const availableWidth = width - horizontalPadding * 2;
  const availableHeight = height - 220;
  const cardWidth = Math.min(availableWidth, availableHeight * 0.75);
  const cardHeight = cardWidth * (4 / 3);
  const pageExtent = height;

  const repeatedFeed = useMemo(() => createHomeFeed(9), []);

  const listRef = useRef<FlatList<(typeof repeatedFeed)[number]>>(null);
  const scrollY = useSharedValue(0);
  const cardsPerCycle = 4;
  const centerIndex = Math.floor(9 / 2) * cardsPerCycle;
  const recenterBuffer = cardsPerCycle * 2;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    const offset = centerIndex * pageExtent;
    listRef.current?.scrollToOffset({ offset, animated: false });
    scrollY.value = offset;
  }, [centerIndex, pageExtent, scrollY]);

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offset = event.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(offset / pageExtent);

    if (
      currentIndex < recenterBuffer ||
      currentIndex > repeatedFeed.length - recenterBuffer
    ) {
      const loopIndex =
        ((currentIndex % cardsPerCycle) + cardsPerCycle) % cardsPerCycle;
      const targetIndex = centerIndex + loopIndex;
      const targetOffset = targetIndex * pageExtent;

      listRef.current?.scrollToOffset({
        offset: targetOffset,
        animated: false,
      });
      scrollY.value = targetOffset;
    }
  };

  return (
    <ThemedView style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </Pressable>

          <Text style={styles.brand}>fitpeak</Text>

          <View style={styles.headerSpacer} />
        </View>

        <Animated.FlatList
          ref={listRef}
          data={repeatedFeed}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => (
            <FeedCard
              item={item}
              index={index}
              scrollY={scrollY}
              pageExtent={pageExtent}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              isWideLayout={isWideLayout}
            />
          )}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleMomentumEnd}
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          pagingEnabled
          snapToInterval={pageExtent}
          snapToAlignment="center"
          disableIntervalMomentum
          alwaysBounceVertical={false}
          removeClippedSubviews
          windowSize={3}
          contentContainerStyle={styles.feedContent}
          style={styles.feedList}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FEFDE4",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FEFDE4",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  profileButton: {
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
  profileIcon: {
    fontSize: 18,
    color: "#5d6d7d",
  },
  brand: {
    fontFamily: Fonts.serif,
    fontSize: 42,
    lineHeight: 42,
    color: "var(--color-sage-900)",
    letterSpacing: -0.8,
  },
  headerSpacer: {
    width: 36,
  },
  feedList: {
    flex: 1,
    width: "100%",
    zIndex: 0,
  },
  feedContent: {
    paddingTop: 0,
    paddingBottom: 0,
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
