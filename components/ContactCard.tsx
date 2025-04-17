import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface ContactCardProps {
  name: string;
  avatarUrl: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ name, avatarUrl }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ContactCard;
