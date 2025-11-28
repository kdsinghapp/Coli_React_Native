// DeliveryOptionCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const DeliveryOptionCard = ({ item, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={item.logo} style={styles.logo} />

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.sub}>{item.rating} ⭐ ({item.reviews} reviews)</Text>
        </View>
      </View>

      {/* Radio Button */}
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryOptionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 8,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  sub: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#BFC7D0",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#FF7A00",
  },
  radioInner: {
    width: 12,
    height: 12,
    backgroundColor: "#FF7A00",
    borderRadius: 6,
  },
});
