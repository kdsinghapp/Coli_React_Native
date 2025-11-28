import React, { useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
   Image ,
   TouchableOpacity
} from "react-native";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../compoent/CustomHeader";
 import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";

type OrderStatus = "packaged" | "shipped" | "inTransit" | "delivered";

type Order = {
  id: string;
  trackingId: string;
  fromCity: string;
  toCity: string;
  startDate: string;
  endDate: string;
  status: OrderStatus;
};

const STATUS_STEPS: OrderStatus[] = [
  "packaged",
  "shipped",
  "inTransit",
  "delivered",
];

type TimelineItem = {
  key: string;
  title: string;
  subtitle?: string;
  time?: string; // e.g., "June 10, 2023 · 05:45 pm"
  done: boolean;
};

 
export default function ViewDetails() {
  const route:any = useRoute();
  const { item } = route?.params || {};

 
  const formatDate = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const order: Order = {
    id: item?.id ?? "1",
    trackingId: item?.trackingId ?? "TY9860036NM",
    fromCity: item?.pickupLocation ?? "Unknown",
    toCity: item?.dropLocation ?? "Unknown",
    startDate: formatDate(item?.pickupDate),
    endDate: formatDate(item?.dropDate ?? new Date().toISOString()),
    status: item?.status ?? "packaged",
  };

  const currentIdx = STATUS_STEPS.indexOf(order.status);
  const progress =
    currentIdx >= 0 ? currentIdx / (STATUS_STEPS.length - 2) : 0;

  const timeline: TimelineItem[] = useMemo(() => {
    return [
      {
        key: "placed",
        title: "Order Placed",
        time: "June 10, 2023 · 05:45 pm",
        done: true, 
        ima :imageIndex.OrderPlaced
      },
      {
        key: "dispatched",
        title: "Order in transit",
        time: "Reached at Jackline Tower, New York",
        done: currentIdx >= 1,
                ima :imageIndex.Ordertransit

      },
      {
        key: "transit",
        title: "Order Dispatched",
        subtitle: "June 11, 2026 |11:03 am",
        done: currentIdx >= 2,
                ima :imageIndex.Ordertransit

      },
      {
        key: "delivered",
        title: "Delivered Successfully",
        subtitle: currentIdx === 3 ? "Delivered" : "Not delivered yet",
        done: currentIdx === 3,
                ima :imageIndex.Ordertransit

      },
    ];
  }, [currentIdx]);
const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
      <CustomHeader label={"View Details"} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32, marginTop: 11 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Card */}
        <TouchableOpacity style={styles.card} 
          // onPress={()=>{
          //   navigation.navigate(ScreenNameEnum.CourierTrackingScreen ,{
          //     item:item
          //   })
          // }}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.muted}>Tracking ID:</Text>
            <Text style={styles.bold}>{order.trackingId}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.trackBase} 
          
        
          >
            <View style={styles.trackLine} />
            <View style={[styles.trackFill, { width: `${progress * 100}%` }]} />
            {STATUS_STEPS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i <= currentIdx ? styles.dotActive : styles.dotInactive,
                  { left: `${(i / (STATUS_STEPS.length - 1)) * 100}%` },
                ]}
              />
            ))}
          </View>

          {/* City Info */}
          <View style={styles.row} 
          
          >
            <View style={styles.cityBlock}>
              <Text style={styles.date}>Jan 30. 2023{order.startDate}</Text>
              <Text style={styles.city}>New York</Text>
              {/* <Text style={styles.city}>{order.fromCity}</Text> */}
            </View>

            <View style={[styles.cityBlock, { alignItems: "flex-end" }]}>
              <Text style={styles.date}>Jan 31. 2023  </Text>
              <Text style={styles.city}>Mumbai</Text>
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.8,
              marginTop: 11,
              borderColor: "#EDEFEE",
              marginBottom: 10,
            }}
          />

          {/* Footer */}
          <View style={styles.footerRow}>
            <View
              style={[
                styles.pill,
                currentIdx === 3 ? styles.pillDone : styles.pillProgress,
              ]}
            >
              <Text style={styles.pillText}>
                {order.status === "packaged"
                  ? "Still Packaged"
                  : order.status === "shipped"
                  ? "In Shipping"
                  : order.status === "inTransit"
                  ? "In Transit"
                  : "Delivered"}
              </Text>
            </View>

            <Text style={styles.viewDetails}>View Details</Text>
          </View>
        </TouchableOpacity>

        {/* Timeline */}
        <Text style={styles.sectionTitle}>Tracking Status</Text>
        <View style={styles.timelineWrap}>
          {timeline.map((t, index) => (
            <TimelineRow
              key={t.key}
              item={t}
              isLast={index === timeline.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
/* ---------- Timeline Row ---------- */

const TimelineRow = ({
  item,
  isLast,
}: {
  item: TimelineItem;
  isLast: boolean;
}) => {
  return (
    <View style={styles.timelineRow}>
      {/* Left: bullet + connector */}
      <View style={styles.timelineLeft}>
        {/* <View style={[styles.timeBullet, item.done ? styles.bulletOn : styles.bulletOff]}>
          <Text style={styles.bulletIcon}>{item.done ? "✓" : "•"}</Text>
        </View> */} 

        <Image source={item.ima} 
        
        style={{
            height:50,
            width:50
        }}
        />
        {!isLast && <View style={[styles.connector, item.done ? styles.connectorOn : styles.connectorOff]} />} 
      </View>

      {/* Right: content */}
      <View style={styles.timelineContent}>
        <Text style={[styles.timelineTitle, item.done && { color: TEXT }]}>{item.title}</Text>
        {item.time ? <Text style={styles.timelineSub}>{item.time}</Text> : null}
        {item.subtitle ? <Text style={styles.timelineSub}>{item.subtitle}</Text> : null}
      </View>
    </View>
  );
};

/* ---------- Styles ---------- */

const YELLOW = "#005091";
const TEXT = "#0F0F0F";
const MUTED = "#7C7C7C";
const CARD = "#FFFFFF";
const BG = "#F7F7F7";
const BORDER = "#EFEFEF";

const styles = StyleSheet.create({
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  backArrow: { fontSize: 26, fontWeight: "700", color: "#6b6b6b", width: 24 },
  headerTitle: { flex: 1, textAlign: "center", fontWeight: "700", fontSize: 16, color: "#4d4d4d" },

  card: {
    backgroundColor: CARD,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 16,
    padding: 14,
    shadowOpacity: 0.05,
    shadowRadius: 8,
     borderWidth: 0.5,
    borderColor: "#eee",    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  muted: { color: MUTED,  fontWeight: "500" },
  bold: { color: TEXT, fontWeight: "500" },

  trackBase: { height: 24, justifyContent: "center", marginBottom: 10 },
  trackLine: { position: "absolute", height: 4, backgroundColor: "#E8E8E8", left: 8, right: 8, borderRadius: 4 },
  trackFill: { position: "absolute", height: 4, backgroundColor: YELLOW, left: 8, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
  dot: { position: "absolute", width: 16, height: 16, marginLeft: -8, borderRadius: 8, top: 4, borderWidth: 3 },
  dotActive: { backgroundColor: YELLOW, borderColor: "#FFF" },
  dotInactive: { backgroundColor: "#FFF", borderColor: "#E8E8E8" },

  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  cityBlock: { flex: 1 },
  date: { color: MUTED, fontSize: 12, fontWeight: "500" ,marginBottom: 4 },
  city: { color: TEXT, fontSize: 16, fontWeight: "500" },
  playButton: {
    width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: BORDER,
    alignItems: "center", justifyContent: "center", marginHorizontal: 10, backgroundColor: "#FFF",
  },
  footerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pill: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999 },
  pillProgress: { backgroundColor: "#F58D17" },
  pillDone: { backgroundColor: "#F58D17" },
  pillText: { fontWeight: "500", fontSize: 12, color: "white" },
  viewDetails: { color: "#F58D17",fontWeight: "500",fontSize: 12, },

  sectionTitle: { marginTop: 18, marginHorizontal: 16, marginBottom: 5, color: TEXT, fontWeight: "600", fontSize: 16 },
  timelineWrap: {
    marginHorizontal: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 16,
  
  },
  timelineRow: { flexDirection: "row", paddingVertical: 14 },
  timelineLeft: { width: 34, alignItems: "center" },
  timeBullet: {
    width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center",
    backgroundColor: "#FFF", borderWidth: 2,
  },
  bulletOn: { borderColor: "red", backgroundColor: "#FFF8D6" },
  bulletOff: { borderColor: "#E3E3E3", backgroundColor: "#FFF" },
  bulletIcon: { fontWeight: "500" },
  connector: { width: 2, flex: 1, marginTop: 4, borderRadius: 1  ,borderColor:"red"},
  connectorOn: { backgroundColor: "red" },
  connectorOff: { backgroundColor: "red" },

  timelineContent: { flex: 1, paddingRight: 8  , marginLeft:16},
  timelineTitle: { fontWeight: "600",fontSize:16, color: "#352C48", marginBottom: 4 },
  timelineSub: { color: MUTED, fontSize: 12,fontWeight: "500" },
});
