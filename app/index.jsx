import { data } from "@/data/todos";
import React from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [text, onChangeText] = React.useState("");
  const [items, setItems] = React.useState([]); // Initialize as an empty array

  const handleAddItem = () => {
    if (text.trim() !== "") {
      const newItem = {
        id: items.length + 1, // Assign a unique ID
        title: text,
        completed: false,
      };
      setItems([...items, newItem]); // Add the new item to the list
      onChangeText(""); // Clear the input box
    } else {
      Alert.alert("Error", "Please enter a valid item.");
    }
  };

  const handleRemoveItem = (id) => {
    const newItems = items.filter((item) => item.id !== id); // Remove the item with the given ID
    setItems(newItems);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header input box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={onChangeText}
            placeholder="Add new todo list item"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddItem}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* List items */}
        <FlatList
          style={{ flex: 1 }}
          data={items} // Use the `items` state instead of `data`
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={[styles.todoText, item.completed && styles.completedText]}>
                {item.title}
              </Text>

              <TouchableOpacity
                style={styles.itemButton}
                onPress={() => handleRemoveItem(item.id)} // Call the remove handler
              >
                <Text style={styles.deleteText}>Del</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  
  deleteText: {
    color: "red",
    fontSize: 16,
    backgroundColor: "red",
    color: "white",
    padding: 6,
    borderRadius: 50
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
})