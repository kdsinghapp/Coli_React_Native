import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import LinearGradient from "react-native-linear-gradient";

// ---------------------- Types ----------------------
type OrderStatus = "packaged" | "shipped" | "inTransit" | "delivered";

type Order = {
  id: string;
  trackingId: string;
  fromCity: string;
  toCity: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  status: OrderStatus;
};

const STATUS_STEPS: OrderStatus[] = [
  "packaged",
  "shipped",
  "inTransit",
  "delivered",
];

// -------------------- Sample Dummy Data --------------------
const DUMMY_ORDERS: Order[] = [
  {
    id: "1",
    trackingId: "TY9860036NM",
    fromCity: "New York",
    toCity: "Mumbai",
    startDate: "2025-11-25T08:00:00Z",
    endDate: "2025-11-28T10:00:00Z",
    status: "packaged",
  },
  {
    id: "2",
    trackingId: "TY9860037NM",
    fromCity: "London",
    toCity: "Paris",
    startDate: "2025-11-22T08:00:00Z",
    endDate: "2025-11-24T10:00:00Z",
    status: "shipped",
  },
  {
    id: "3",
    trackingId: "TY9860038NM",
    fromCity: "Berlin",
    toCity: "Rome",
    startDate: "2025-11-20T08:00:00Z",
    endDate: "2025-11-23T10:00:00Z",
    status: "delivered",
  },
];

// ---------------------- Main Component ----------------------
export default function OrdersScreen() {
  const [tab, setTab] = useState<"pending" | "complete">("pending");
  const nava = useNavigation();

  // ---------------------- Filter Data based on Tab ----------------------
  const data = useMemo(() => {
    return DUMMY_ORDERS.filter((o) =>
      tab === "pending" ? o.status !== "delivered" : o.status === "delivered"
    );
  }, [tab]);

  // ---------------------- Order Card ----------------------
  const OrderCard = ({ order }: { order: Order }) => {
    const formatDate = (isoString: string) => {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          nava.navigate(ScreenNameEnum.ViewDetails, { item: order });
        }}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.trackingLabel}>Tracking ID:</Text>
          <Text style={styles.trackingId}>{order.trackingId}</Text>
        </View>

        <ProgressTrack status={order.status} />

        <View style={styles.row}>
          <View style={styles.cityBlock}>
            <Text style={styles.date}>{formatDate(order.startDate)}</Text>
            <Text style={styles.city}>{order.fromCity}</Text>
          </View>

          <Pressable style={styles.playButton}>
            <Image
              style={{ height: 28, width: 28 }}
              source={imageIndex.BackLeft}
            />
          </Pressable>

          <View style={[styles.cityBlock, { alignItems: "flex-end" }]}>
            <Text style={styles.date}>{formatDate(order.endDate)}</Text>
            <Text style={styles.city}>{order.toCity}</Text>
          </View>
        </View>

        <View
          style={{
            borderTopWidth: 2,
            marginBottom: 13,
            borderColor: "#EDEFEE",
          }}
        />

        <View style={styles.footerRow}>
          <StatusPill status={order.status} />
          <Pressable onPress={() => console.log("View details", order.id)}>
            <Text style={styles.viewDetails}>View Details</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBarComponent />

      <View style={styles.container}>
        <Text style={styles.title}>Orders</Text>

        {/* Tabs */}
        <View style={styles.tabsWrap}>
          <SegmentedTab
            label="Pending"
            active={tab === "pending"}
            onPress={() => setTab("pending")}
          />
          <SegmentedTab
            label="Complete"
            active={tab === "complete"}
            onPress={() => setTab("complete")}
          />
        </View>

        <FlatList
          contentContainerStyle={{ paddingBottom: 24, marginTop: 11 }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderCard order={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", marginTop: 20, color: "gray" }}>
              No orders found
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// ---------------------- Segmented Tabs ----------------------
const SegmentedTab = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={[styles.tab, active && styles.tabActive]}
  >
    <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
  </Pressable>
);

// ---------------------- Status Pill ----------------------
const StatusPill = ({ status }: { status: OrderStatus }) => {
  let text = "";
  switch (status) {
    case "packaged":
      text = "Still Packaged";
      break;
    case "shipped":
      text = "In Shipping";
      break;
    case "inTransit":
      text = "In Transit";
      break;
    case "delivered":
      text = "Delivered";
      break;
  }

  return (
    <LinearGradient
      style={{
        height: 38,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 11,
        width: 120,
      }}
      colors={
        status === "delivered"
          ? ["#DFF7DA", "#DFF7DA", "#DFF7DA"]
          : ["#F58D17", "#F58D17", "#EF571F"]
      }
    >
      <Text
        style={{
          textAlign: "center",
          color: status === "delivered" ? "#005091" : "white",
          fontWeight: "600",
          fontSize: 15,
        }}
      >
        {text}
      </Text>
    </LinearGradient>
  );
};

// ---------------------- Progress Track ----------------------
const ProgressTrack = ({ status }: { status: OrderStatus }) => {
  const idx = STATUS_STEPS.indexOf(status);
  const progress = idx / (STATUS_STEPS.length - 1);

  return (
    <View style={styles.trackBase}>
      <View style={styles.trackLine} />
      <View style={[styles.trackFill, { width: `${progress * 100}%` }]} />
      {STATUS_STEPS.map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i <= idx ? styles.dotActive : styles.dotInactive,
            { left: `${(i / (STATUS_STEPS.length - 1)) * 100}%` },
          ]}
        />
      ))}
    </View>
  );
};

// ---------------------- Styles ----------------------
const YELLOW = "#005091";
const TEXT = "#0F0F0F";
const MUTED = "#7C7C7C";
const CARD = "#FFFFFF";
const BG = "white";
const BORDER = "#EFEFEF";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  title: { fontSize: 28, fontWeight: "500", color: TEXT, marginBottom: 10 },

  tabsWrap: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    marginTop: 11,
    shadowRadius: 1.41,
    borderColor: "#eee",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#F58D17",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: { fontSize: 14, fontWeight: "500", color: "#EF571F" },
  tabTextActive: { color: "white", fontSize: 15, fontWeight: "500" },

  card: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 14,
    borderColor: BORDER,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  trackingLabel: { color: MUTED, fontWeight: "500" },
  trackingId: { color: TEXT, fontWeight: "500" },

  trackBase: { height: 24, justifyContent: "center", marginBottom: 12 },
  trackLine: {
    position: "absolute",
    height: 4,
    backgroundColor: "#E8E8E8",
    left: 8,
    right: 8,
    borderRadius: 4,
  },
  trackFill: {
    position: "absolute",
    height: 4,
    backgroundColor: YELLOW,
    left: 8,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  dot: { position: "absolute", width: 16, height: 16, marginLeft: -8, borderRadius: 8, top: 4, borderWidth: 3 },
  dotActive: { backgroundColor: YELLOW, borderColor: "#FFF" },
  dotInactive: { backgroundColor: "#005091", borderColor: "#E8E8E8" },

  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  cityBlock: { flex: 1 },
  date: { color: MUTED, fontSize: 14, marginBottom: 4, fontWeight: "500" },
  city: { color: TEXT, fontSize: 16, fontWeight: "500", marginTop: 8 },

  playButton: { width: 28, height: 28 },

  footerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pill: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999, backgroundColor: "#EF571F" },

  viewDetails: { color: "#EF571F", fontWeight: "500", fontSize: 14 },
});
