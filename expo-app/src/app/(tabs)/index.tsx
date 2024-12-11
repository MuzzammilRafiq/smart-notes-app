// App.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";

const categories = [
  {
    id: "1",
    title: "Electronics",
    items: ["Phones", "Laptops", "Tablets", "Cameras"],
  },
  {
    id: "2",
    title: "Clothing",
    items: ["Shirts", "Pants", "Dresses", "Shoes"],
  },
  {
    id: "3",
    title: "Books",
    items: ["Fiction", "Non-Fiction", "Education", "Comics"],
  },
  {
    id: "4",
    title: "Sports",
    items: ["Football", "Basketball", "Tennis", "Golf"],
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const renderItem = ({ item, index }) => {
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedCategory(isSelected ? null : item.id)}
      >
        <Text style={styles.title}>{item.title}</Text>
        {isSelected && (
          <View style={styles.itemsList}>
            {item.items.map((subItem, idx) => (
              <Text key={idx} style={styles.item}>
                {subItem}
              </Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  card: {
    width: "45%",
    margin: 8,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 100,
  },
  selectedCard: {
    elevation: 5,
    shadowOpacity: 0.2,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  itemsList: {
    marginTop: 10,
  },
  item: {
    padding: 8,
    fontSize: 14,
    color: "#666",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
