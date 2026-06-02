import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import { SymbolView } from "expo-symbols";
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
          <SymbolView
            tintColor="#FEFDE4"
            name={{ ios: icon as any, android: icon as any, web: "camera" }}
            size={24}
          />
        </View>
      ) : (
        <View style={styles.tabButtonView}>
          <SymbolView
            tintColor="#64a076"
            name={{ ios: icon as any, android: icon as any, web: icon as any }}
            size={20}
          />
          <Text style={[styles.label, { color: "#64a076" }]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
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
    minWidth: 58,
  },
  centerButton: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#64a076",
    boxShadow: "0px 4px 8px rgba(140, 163, 127, 0.28)",
    elevation: 4,
  },
  centerButtonFocused: {
    backgroundColor: "#4f8a62",
  },
  label: {
    marginTop: 2,
    fontSize: 12,
    fontFamily: Fonts.serif,
    color: "#64a076",
  },
});
