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
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../../../compoent/CustomButton";
import CustomHeader from "../../../compoent/CustomHeader";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import imageIndex from "../../../assets/imageIndex";
import font from "../../../theme/font";

// Types
type RoleOption = {
  id: number;
  type?: "user" | "Delivery" | "Marketplace";
  label: string;
  image: any;
  activeimage: any;
  description?: string;
};

// Screen Dimensions
const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Role Options
const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 1,
    type: "user",
    label: "Courier",
    image: imageIndex.active,
    activeimage: imageIndex.CounteActive,
    description: "Send packages and track deliveries",
  },
  {
    id: 2,
    label: "Agency",
    image: imageIndex.Agency,
    activeimage: imageIndex.AgencyActive,
    description: "Deliver packages and earn money",
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

const ReceiverRole = () => {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const { fadeAnim, scaleAnim, pulseAnim, triggerPulseAnimation } =
    useRoleSelectionAnimations();

  // Handle role selection
  const handleRoleSelect = (role: RoleOption) => {
    setSelectedRole(role);
    triggerPulseAnimation();
  };

  // Handle Continue button
  const handleContinue = () => {
    if (!selectedRole) return;
    console.log("Selected Role:", selectedRole);
    // TODO: Navigate to next screen
  };

  // Role Card Component
  const RoleCard = ({
    role,
    isSelected,
  }: {
    role: RoleOption;
    isSelected: boolean;
  }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardWrapper}
      onPress={() => handleRoleSelect(role)}
    >
      <Animated.View
        style={[
          styles.cardContainer,
          { transform: [{ scale: isSelected ? pulseAnim : 1 }] },
        ]}
      >
        <LinearGradient
          colors={
            isSelected
              ? ["#F58D17", "#F58D17", "#EF571F"]
              : ["#FFFFFF", "#FFFFFF"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, isSelected && styles.cardSelected]}
        >
          <View style={styles.cardContent}>
             <Text
              style={[
                styles.label,
                { color: isSelected ? "#fff" : "#1A1A1A" },
              ]}
            >
              {role.label}
            </Text>
            <View style={styles.iconContainer}>
              <Image
                source={isSelected ? role.activeimage : role.image}
                style={styles.icon}
                resizeMode="cover"
              />
            </View>
           
          
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader label="Back" />
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
             {ROLE_OPTIONS.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                isSelected={selectedRole?.id === role.id}
              />
            ))}
 
        </Animated.View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <CustomButton
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedRole}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReceiverRole;

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
  },
  cardWrapper: {
    width: "90%",
    marginVertical: 10,
    alignItems: "center", 
    
  },
  cardContainer: {
    width: "100%",
    maxWidth: 500,
  },
  card: {
 borderRadius: 20,
    
    paddingVertical: 20,
    paddingHorizontal: 16,
    // Shadow for iOS
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.1,
      },
      android: {
        elevation: 3, // Only works on Android
      },
    }),
 
  },
  cardSelected: {},
  cardContent: {
    alignItems: "center",
    marginBottom:15
  },
  iconContainer: {
    width: 77,
    height: 77,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  icon: {
    width: 60,
    height: 60,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 16,
    },
});
