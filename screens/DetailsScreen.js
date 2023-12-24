import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailScreen = ({ route }) => {
  const { item } = route.params;

  const [selectedItem] = useState(item);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>
            {parseInt(selectedItem.id, 10) + 1}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemName}>{selectedItem.name}</Text>
          <Text style={styles.subtitle}>{selectedItem.subtitle}</Text>
          <Text style={styles.description}>{selectedItem.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cardContainer: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6384",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imageText: {
    fontSize: 36,
    color: "#fff",
  },
  textContainer: {
    flex: 1,
    padding: 20,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFA500",
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: "#444",
  },
});

export default DetailScreen;
