import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useStore } from '../store'; // ✅ Make sure the path is correct

type Contact = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

export default function ContactDetailScreen(): JSX.Element {
  const route = useRoute();
  const { contact } = route.params as { contact: Contact };

  const favourites = useStore((state) => state.favourites);
  const addFavourite = useStore((state) => state.addFavourite);
  const removeFavourite = useStore((state) => state.removeFavourite);

  const isFavourite = favourites.some((fav: Contact) => fav.id === contact.id);

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFavourite(contact.id);
      Alert.alert('Removed from favorites');
    } else {
      addFavourite(contact);
      Alert.alert('Added to favorites');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: contact.picture }} style={styles.image} />
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.email}>{contact.email}</Text>
      <Button
        title={isFavourite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={toggleFavourite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
});
