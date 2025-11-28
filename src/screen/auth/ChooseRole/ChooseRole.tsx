import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  Easing,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
 import LinearGradient from "react-native-linear-gradient";
import ScreenNameEnum from "../../../routes/screenName.enum";
 import imageIndex from "../../../assets/imageIndex";
import font from "../../../theme/font";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
 
// Types and Constants
type RoleOption = {
  id: number;
  type: "user" | "Delivery" | "Marketplace";
  label: string;
  image: any;
  description: string;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ROLE_OPTIONS: RoleOption[] = [
  { 
    id: 1, 
    type: "user", 
    label: "Sender", 
    image: imageIndex.marketplace,
    description: "Send packages and track deliveries" ,
    
  },
  { 
    id: 2, 
    type: "Delivery", 
    label: "Courier Boy", 
    image: imageIndex.CourierBoy,
    description: "Deliver packages and earn money"
  },
  { 
    id: 3, 
    type: "Marketplace", 
    label: "Marketplace", 
    image: imageIndex.marketplace,
    description: "Buy and sell products easily"
  },
];

// Custom Hook for Animations
const useRoleSelectionAnimations = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const triggerPulseAnimation = () => {
    pulseAnim.setValue(1);
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.06,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(pulseAnim, {
        toValue: 1,
        friction: 3,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { fadeAnim, scaleAnim, pulseAnim, triggerPulseAnimation };
};

const ChooseRole = () => {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const { fadeAnim, scaleAnim, pulseAnim, triggerPulseAnimation } = useRoleSelectionAnimations();

  const handleRoleSelect = (role: RoleOption) => {
         navigation.navigate(ScreenNameEnum.Login);
    setSelectedRole(role);
    triggerPulseAnimation();
  };

 

  const RoleCard = ({ role, isSelected }: { role: RoleOption; isSelected: boolean }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardWrapper}
      onPress={() => handleRoleSelect(role)}
      // onPress={() => handleRoleSelect(role)}
    >
      <Animated.View 
        style={[
          styles.cardContainer,
          { transform: [{ scale: isSelected ? pulseAnim : 1 }] }
        ]}
      >
        <LinearGradient
          colors={
            isSelected
              ? ["#F58D17", "#F58D17", "#EF571F"]
              : ["#FFFFFF", "#F8F8F8"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.card,
            isSelected && styles.cardSelected,
          ]}
        >
          <View style={styles.cardContent}>
             <Text style={[styles.label, { color: isSelected ? "#fff" : "#1A1A1A" }]}>
              {role.label}
            </Text>
          
              <Image
                source={role.image}
                style={[
                  styles.icon,
                 ]}
                resizeMode="contain"
              />
      
           
            
          </View>
          
          
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarComponent />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Choose Your Role</Text>
            <Text style={styles.subTitle}>
              Select how you want to use Cooli App
            </Text>
          </View>

          {/* Role Options */}
          <View style={styles.optionsContainer}>
            {ROLE_OPTIONS.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                isSelected={selectedRole?.id === role.id}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Footer Button */}
     
    </SafeAreaView>
  );
};

export default ChooseRole;

// Optimized Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: font.MonolithRegular,
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 34,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    fontFamily: font.MonolithRegular,
    lineHeight: 22,
  },
  optionsContainer: {
    width: "70%",
    alignItems: "center",
    paddingHorizontal: 5,
        paddingVertical: 10, 
  
  },
  cardWrapper: {
    width: "100%",
    alignItems: "center",
   },
  cardContainer: {
    width: "100%",
    maxWidth: 500,
  },
  card: {
  borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    elevation: 5, // shadow for Android
     backgroundColor: "white", // make sure content is visible 
    margin:10 ,
    
    },
  cardSelected: {
 
 
   },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
     height:150 ,
   },
  iconContainer: {
    width: 80,
    height: 80,
     alignItems: "center",
    justifyContent: "center",
   
   },
  iconContainerSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  icon: {
    height: 80,
    width: 80,
  },
  label: {
    fontSize: 16,
     fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,

  },
  description: {
    fontSize: 14,
    fontFamily: font.MonolithRegular,
    textAlign: "center",
    lineHeight: 18,
  },
  selectedIndicator: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F58D17",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 16,
    backgroundColor: "#F9F9F9",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
});