import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native';

export default function ContactsScreen({ navigation }: any) {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [favorites, setFavorites] = useState<Contacts.Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      setContacts(data);
    } else {
      alert('Permission to access contacts was denied');
    }
    setLoading(false);
  };

  const addContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied to add contact.');
      return;
    }

    const contact = {
      [Contacts.Fields.FirstName]: 'New',
      [Contacts.Fields.LastName]: 'Contact',
      [Contacts.Fields.PhoneNumbers]: [{
        label: 'mobile',
        number: '1234567890',
      }],
    };

    try {
      await Contacts.addContactAsync(contact);
      alert('Contact added!');
      loadContacts(); // refresh the list
    } catch (err) {
      console.error('Error adding contact:', err);
      alert('Failed to add contact. Check permissions.');
    }
  };

  const handleFavorite = (contact: Contacts.Contact) => {
    if (!favorites.find((fav) => fav.id === contact.id)) {
      const updatedFavorites = [...favorites, contact];
      setFavorites(updatedFavorites);
      navigation.navigate('Favorites', { favorites: updatedFavorites });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Button title="Add Contact" onPress={addContact} />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>
              {item.phoneNumbers?.[0]?.number ?? 'No number'}
            </Text>
            <TouchableOpacity onPress={() => handleFavorite(item)}>
              <Text style={styles.favoriteBtn}>❤️ Add to Favorites</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  phone: {
    color: 'gray',
  },
  favoriteBtn: {
    marginTop: 4,
    color: 'tomato',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});