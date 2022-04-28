import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TextButton = (props) => {
  const styles = StyleSheet.create({
    textButton: {
      padding: 10, borderWidth: 1, borderColor: props.backgroundColor ?? 'green', borderRadius: 10,
      backgroundColor: props.backgroundColor ?? 'green',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'poppins',
      fontSize: 16,
    },
  });

  return (
    <TouchableOpacity onPress={props.onPress} android_ripple={{ color: '#cccccc' }}>
      <Text style={styles.textButton}>{props.title ?? 'Button'}</Text>
    </TouchableOpacity>
  );

}

export default TextButton;
