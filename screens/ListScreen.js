import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Modal,
  ToastAndroid,
} from "react-native";

const Card = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("Details", { item })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemSubtitle, setNewItemSubtitle] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const mockData = Array.from({ length: 2000 }, (_, index) => ({
      id: index.toString(),
      name: `Item ${index + 1}`,
      subtitle: `Subtitle for Item ${index + 1}`,
      description: `Description for Item ${index + 1}, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
    }));

    setTimeout(() => {
      setItems(mockData);
      setFilteredItems(mockData);
      setLoading(false);
    }, 2000);
  }, []);

  const handleSearch = useCallback(
    (text) => {
      setSearchQuery(text);
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(filtered);
    },
    [items]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setFilteredItems(items);
      setRefreshing(false);
    }, 1000);
  }, [items]);

  const renderItem = ({ item }) => <Card item={item} navigation={navigation} />;

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddItem = () => {
    const newItem = {
      id: items.length.toString(),
      name: newItemName,
      subtitle: newItemSubtitle,
      description: newItemDescription,
    };
    setItems([...items, newItem]);
    setFilteredItems([...items, newItem]);
    setNewItemName("");
    setNewItemSubtitle("");
    setNewItemDescription("");
    toggleModal();
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // Hides success message after 3 seconds
  };

  useEffect(() => {
    if (showSuccessMessage) {
      ToastAndroid.show("Item added successfully!", ToastAndroid.SHORT);
    }
  }, [showSuccessMessage]);

  const renderNoData = () => {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No Data Found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by item number..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          {filteredItems.length === 0 ? (
            renderNoData()
          ) : (
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#0000ff"]}
                />
              }
            />
          )}
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={toggleModal}
          >
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add New Item</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter Name"
                  value={newItemName}
                  onChangeText={(text) => setNewItemName(text)}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter Subtitle"
                  value={newItemSubtitle}
                  onChangeText={(text) => setNewItemSubtitle(text)}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter Description"
                  value={newItemDescription}
                  multiline={true}
                  onChangeText={(text) => setNewItemDescription(text)}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleAddItem}
                  >
                    <Text style={styles.modalButtonText}>Add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={toggleModal}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    width: "100%",
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  cardContainer: {
    minWidth: "95%",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  cardContent: {
    padding: 16,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#333",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#00f",
    borderRadius: 30,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#00f",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#aaa",
  },
});

export default ListScreen;
