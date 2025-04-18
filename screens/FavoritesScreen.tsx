import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useStore } from '../store'; // ✅ Import from the new store file

export default function FavoritesScreen(): JSX.Element {
  const favourites = useStore((state) => state.favourites);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.picture }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name} ⭐</Text>
        <Text>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favourites.length === 0 ? (
        <Text style={styles.empty}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    gap: 12,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#888',
  },
});
