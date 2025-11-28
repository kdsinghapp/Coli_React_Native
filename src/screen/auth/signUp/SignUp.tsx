import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
 } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
 import StatusBarCompoent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import ResponsiveSize from '../../../utils/ResponsiveSize';
 import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
 import LoadingModal from '../../../utils/Loader';
  import useSignup from './useSinup';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../../../compoent/TextInputField';
import CustomHeader from '../../../compoent/CustomHeader';

export default function SignUp() {
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleSignup,
    navigation,
    selectedOption,
    setSelectedOption,
    dropOpen,
    setDropOpen,
    selectedCountryCode,
    setSelectedCountryCode,
    countyModal,
    setCountyModal,
    handleCountryCodeSelect,
  } = useSignup();

   const [isSelected, setIsSelected] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCompoent />
      <CustomHeader label="Back" />
      {isLoading && <LoadingModal />}
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          

             <Text style={styles.title}>Sign Up</Text>
             <Text style={{
              color:"#9DB2BF" ,
              fontSize:17 ,
              marginTop:8
             }}>Let's get started by creating your account</Text>
 
          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={{
              flexDirection:"row",
              justifyContent:"space-between" ,
              width:"50%" ,
              }}>
                <View style={{
                  margin:5
                }}>
            <TextInputField
              // onChangeText={(value: string) => handleChange('fullName', value)}
              placeholder="First Name "
              // value={credentials.fullName}
              firstLogo={true}
              img={imageIndex.Textprofile}
            />
             </View>
              <View style={{
                  margin:5
                }}>
               <TextInputField
              // onChangeText={(value: string) => handleChange('fullName', value)}
              placeholder="Last Name"
              value={credentials.fullName}
              firstLogo={true}
              img={imageIndex.Textprofile}
            />
            </View>
            </View>
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}

            {/* Email */}
            <TextInputField
              onChangeText={(value: string) => handleChange('email', value)}
              placeholder="Email"
              value={credentials.email}
              firstLogo={true}
              img={imageIndex.mess}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Phone with Country Code */}
           <TextInputField
              onChangeText={(value: string) => handleChange('email', value)}
              placeholder="Phone Number"
              // value={credentials.email}
      firstLogo={true}
              img={imageIndex.Textphone}
              // keyboardType=""
              // autoCapitalize="none"
             />

            {/* Password */}
            <TextInputField
              onChangeText={(value: string) => handleChange('password', value)}
              placeholder="Password"
              value={credentials.password}
              firstLogo={true}
              showEye={true}
              img={imageIndex.textLock}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
 
 
          
          </View>

           <TouchableOpacity
      style={{
        flexDirection:"row",
        justifyContent:"space-between" ,
        marginBottom:18
      }}
      onPress={() => setIsSelected(!isSelected)}
      activeOpacity={0.8}
    >
      <Image
        style={styles.icon}
        source={
          isSelected ?
           imageIndex.checked // filled checkbox
            :           imageIndex.checked 
 
         }
      />

      <Text style={styles.text}>
        I agree to the{" "}
        <Text style={styles.link}>Barber Terms of Service</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </TouchableOpacity>


          {/* Sign Up Button */}
          <CustomButton
            title="Sign up"
            // onPress={handleSignup}
               onPress={() => navigation.navigate(ScreenNameEnum.Login)}
             disabled={isLoading}
          />

          {/* Login Redirect */}
          <View style={styles.loginRedirect}>
            <Text style={styles.redirectText}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenNameEnum.Login)}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      {/* <CountryCodeModal
        visible={countyModal}
        onSelect={handleCountryCodeSelect}
        onClose={() => setCountyModal(false)}
      /> */}
{/*       
      <DropdownModal
        visible={dropOpen}
        options={injuryOptions}
        onSelect={handleOptionSelect}
        onClose={() => setDropOpen(false)}
        selectedValue={selectedOption}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 

  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    backgroundColor: '#FFF',
    padding: 15,
    flex: 1,
    marginTop: hp(1.1),
  },
  header: {
     justifyContent: 'center',
    flex: 1,
  },
  logo: {
    height: 57,
    width: 57,
  },
  titleContainer: {
    marginTop: 5,
   },
     icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    color: "#505050",
    flex: 1,
    lineHeight: 20,
  },
  link: {
    color: "black",
    fontWeight: "600",
  },

  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
  },
  formContainer: {
    marginTop: ResponsiveSize.marginTop(10),
    paddingVertical: hp(2),
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeButton: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  phoneInput: {
    flex: 1,
  },
  dropdownTrigger: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  signupButton: {
    width: '100%',
   },
  loginRedirect: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  redirectText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: '#909090',
  },
  loginText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: 'black',
  },
});