import React, { memo } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import font from '../theme/font';

const LogoutModal = ({ visible, onLogout, onCancel }: any) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text allowFontScaling={false} style={styles.title}>
            Log Out
          </Text>

          {/* Message */}
          <Text allowFontScaling={false} style={styles.message}>
            Are you sure you want to log out of your account?
          </Text>

          {/* Footer Buttons */}
          <View style={styles.buttonContainer}>

            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text allowFontScaling={false} style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            {/* YES Button (Gradient) */}
            <LinearGradient
              colors={['#F58D17', '#F58D17', '#EF571F']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.83, y: 0 }}
              style={styles.gradientButton}
            >
              <TouchableOpacity style={styles.yesButton} onPress={onLogout}>
                <Text allowFontScaling={false} style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </LinearGradient>

          </View>

        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDEDED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  closeText: {
    fontSize: 26,
    color: '#A0A0A0',
  },
  title: {
    fontSize: 20,
    fontFamily: font.MonolithRegular,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
    fontFamily: font.MonolithRegular,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },

  /* Cancel Button */
  cancelButton: {
    flex: 1,
    backgroundColor: '#EDEDED',
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontSize: 16,
    fontFamily: font.MonolithRegular,
    fontWeight: '600',
  },

  /* YES Button with Gradient */
  gradientButton: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 10,
  },
  yesButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  yesText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: font.MonolithRegular,
    fontWeight: '600',
  },
});

export default memo(LogoutModal);
