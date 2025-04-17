import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function FavoritesScreen({ route }: any) {
  const favorites = route.params?.favorites ?? [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Contacts</Text>
      {favorites.length === 0 ? (
        <Text>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.phoneNumbers?.[0]?.number ?? 'No number'}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contactItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
});
