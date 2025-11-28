import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../compoent/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";

const PickupTypeScreen = () => {
  const [selected, setSelected] = useState("home");
  const nat = useNavigation()
const onpRess =()=>{
    nat.navigate(ScreenNameEnum.ChooseDeliveryScreen)
}
  return (
    <SafeAreaView style={styles.container}>
 <StatusBarComponent />
      <CustomHeader label="Pickup type" />

      {/* Home Pickup */}
      <TouchableOpacity 
      style={{
        marginTop:20
      }}
      onPress={onpRess} activeOpacity={0.8}>
        {selected === "home" ? (
          <LinearGradient
            colors={["#F58D17", "#F58D17", "#EF571F"]}
            style={styles.cardSelected}
          >
            <View style={styles.row}>
              <View style={styles.iconBoxSelected}>
                {/* <Image
                  source={require("./homeIcon.png")}
                  style={styles.iconSelected}
                /> */}
              </View>
              <Text style={styles.cardTitleSelected}>Home Pickup</Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconBox}>
                <Image
                  source={imageIndex.activeAdresh}      
                  style={styles.icon}
                />
              </View>
              <Text style={styles.cardTitle}>Home Pickup</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* Drop at Agency */}
      <TouchableOpacity onPress={onpRess} activeOpacity={0.8}>
        {selected === "agency" ? (
          <LinearGradient
            colors={["#F58D17", "#F58D17", "#EF571F"]}
            style={styles.cardSelected}
          >
            <View style={styles.row}>
              <View style={styles.iconBoxSelected}>
                <Image
   source={imageIndex.unw}      
   
   style={styles.iconSelected}
                />
              </View>
              <Text style={styles.cardTitleSelected}>Drop at Agency</Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconBox}>
                <Image
                  source={imageIndex.drop}      
                  style={styles.icon}
                />
              </View>
              <Text style={styles.cardTitle}>Drop at Agency</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* Bottom Illustration */}
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Image
          source={imageIndex.unw}
          style={{ width: 220, height: 260, resizeMode: "contain" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PickupTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#FFFFFF",
  },
  selectLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 20,
  },

  /* Unselected */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 45,
    height: 45,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#F58D17",
  },
  cardTitle: {
    marginLeft: 15,
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },

  /* Selected */
  cardSelected: {
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
  },
  iconBoxSelected: {
    width: 45,
    height: 45,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  iconSelected: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  cardTitleSelected: {
    marginLeft: 15,
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
