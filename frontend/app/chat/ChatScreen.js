import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/chat', {
        message,
      });
      setResponses(prev => [...prev, { user: message, bot: res.data.response }]);
      setMessage('');
    } catch (error) {
      setResponses(prev => [...prev, { user: message, bot: "Something went wrong. Try again later." }]);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {responses.map((entry, index) => (
          <View key={index} style={styles.messageBlock}>
            <Text style={styles.user}>You: {entry.user}</Text>
            <Text style={styles.bot}>Bot: {entry.bot}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title={loading ? "Sending..." : "Send"} onPress={sendMessage} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 40 },
  chatContainer: { flex: 1, marginBottom: 10 },
  messageBlock: { marginBottom: 12 },
  user: { fontWeight: 'bold', color: '#333' },
  bot: { marginTop: 4, color: '#444' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
});

export default ChatScreen;
