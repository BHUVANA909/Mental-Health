import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';

const ChatScreen = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newChat = [...chat, { sender: 'user', text: input }];
    setChat(newChat);
    setInput('');

    const res = await fetch('http://<YOUR-IP>:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setChat([...newChat, { sender: 'bot', text: data.response }]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        {chat.map((msg, i) => (
          <Text key={i} style={msg.sender === 'user' ? styles.user : styles.bot}>{msg.text}</Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={input}
        placeholder="How are you feeling?"
        onChangeText={setInput}
        onSubmitEditing={sendMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  chatBox: { flex: 1, marginBottom: 10 },
  user: { alignSelf: 'flex-end', backgroundColor: '#d1e7dd', padding: 10, borderRadius: 10, marginVertical: 4 },
  bot: { alignSelf: 'flex-start', backgroundColor: '#f8d7da', padding: 10, borderRadius: 10, marginVertical: 4 },
  input: { borderWidth: 1, padding: 10, borderRadius: 10 }
});

export default ChatScreen;
