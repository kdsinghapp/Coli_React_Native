// ChooseDeliveryScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import DeliveryOptionCard from "../../../compoent/DeliveryOptionCard";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../compoent/CustomHeader";
 

const ChooseDeliveryScreen = () => {
  const [selected, setSelected] = useState("DHL");

  const companies = [
    { id: "DHL", name: "DHL", logo: imageIndex.PAY, rating: "4.3", reviews: "1200" },
    { id: "MR", name: "Mondial Relay", logo:  imageIndex.pay1, rating: "4.0", reviews: "950" },
    { id: "UPS", name: "UPS", logo:  imageIndex.pay3,rating:"3.8", reviews: "720" },
    { id: "CP", name: "Colis Privé", logo:  imageIndex.pay4, rating: "4.0", reviews: "500" },
  ];

  return (
    <SafeAreaView style={styles.container}>
              <StatusBarComponent />
      <CustomHeader label="Back" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.header}>Choose your delivery company</Text>

        {companies.map((item) => (
          <DeliveryOptionCard
            key={item.id}
            item={item}
            selected={selected === item.id}
            onPress={() => setSelected(item.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseDeliveryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000",
  },
});
