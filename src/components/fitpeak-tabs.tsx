import { Image } from "expo-image";
import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Fonts, Spacing } from "@/constants/theme";

export default function FitpeakTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: "100%", zIndex: 0 }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon="house" label="Home" />
          </TabTrigger>
          <TabTrigger name="search" href="/search" asChild>
            <TabButton icon="magnifyingglass" label="Search" />
          </TabTrigger>
          <TabTrigger name="camera" href="/camera" asChild>
            <TabButton icon="camera.fill" label="" center />
          </TabTrigger>
          <TabTrigger name="calendar" href="/calendar" asChild>
            <TabButton icon="calendar" label="Calendar" />
          </TabTrigger>
          <TabTrigger name="folder" href="/folder" asChild>
            <TabButton icon="folder" label="Folder" />
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  isFocused,
  icon,
  label,
  center = false,
  ...props
}: TabTriggerSlotProps & { icon: string; label: string; center?: boolean }) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.tabPressable, pressed && styles.pressed]}
    >
      {center ? (
        <View
          style={[styles.centerButton, isFocused && styles.centerButtonFocused]}
        >
          <Image
            source={require("@/assets/icons/Camera.svg")}
            style={styles.centerIcon}
            contentFit="contain"
          />
        </View>
      ) : (
        <View style={styles.tabButtonView}>
          <TabIcon icon={icon} focused={Boolean(isFocused)} />
          <Text style={[styles.label, { color: "#5A906A" }]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  const source = getTabIconSource(icon, focused);

  return <Image source={source} style={styles.tabIcon} />;
}

function getTabIconSource(icon: string, focused: boolean) {
  switch (icon) {
    case "house":
      return focused
        ? require("@/assets/icons/HomePress.svg")
        : require("@/assets/icons/Home.svg");
    case "magnifyingglass":
      return focused
        ? require("@/assets/icons/SearchPress.svg")
        : require("@/assets/icons/Search.svg");
    case "camera.fill":
      return require("@/assets/icons/Camera.svg");
    case "calendar":
      return focused
        ? require("@/assets/icons/CalendarPress.svg")
        : require("@/assets/icons/Calendar.svg");
    case "folder":
      return focused
        ? require("@/assets/icons/TagPress.svg")
        : require("@/assets/icons/Tag.svg");
    default:
      return require("@/assets/icons/Tag.svg");
  }
}

function CustomTabList({ children, ...props }: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <View style={styles.innerContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabPressable: {
    alignItems: "center",
    justifyContent: "center",
    textDecorationLine: "none",
  },
  tabListContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: Spacing.three,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 40,
    elevation: 40,
    backgroundColor: "#FEFDE4",
    overflow: "visible",
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexGrow: 1,
    maxWidth: 500,
    backgroundColor: "#FEFDE4",
  },
  pressed: {
    opacity: 0.82,
  },
  tabButtonView: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
  },
  tabIcon: {
    width: 22,
    height: 22,
  },
  centerIcon: {
    width: 24,
    height: 24,
  },
  centerButton: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#5A906A",
    boxShadow: "0px 4px 8px rgba(140, 163, 127, 0.28)",
    elevation: 4,
  },
  centerButtonFocused: {
    backgroundColor: "#4f8a62",
  },
  label: {
    marginTop: 2,
    fontSize: 13,
    fontFamily: Fonts.serif,
    color: "#5A906A",
  },
});
