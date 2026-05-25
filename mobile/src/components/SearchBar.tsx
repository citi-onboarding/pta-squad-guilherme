import { useState } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { Search } from "lucide-react-native";

export default function SearchBarMob() {
  const [pressed, setPressed] = useState(false);
  const [search, SetSearch] = useState("");
  const SearchingLoan = () => {
    console.log("Buscando...", search);
  };
  return (
    <View className="mx-7 mt-7">
      {/* Input */}
      <View
        className="bg-white"
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#e5e7eb",
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
          gap: 8,
        }}
      >
        <Search size={18} color="#999" />
        <TextInput
          placeholder="Buscar..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={SetSearch}
          style={{ flex: 1, fontSize: 14, color: "#333" }}
        />
      </View>

      {/* Botão */}
      <Pressable
        onPress={SearchingLoan}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{
          backgroundColor: pressed ? "#059669" : "#10b981",
          borderRadius: 12,
          paddingVertical: 16,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          Buscar
        </Text>
      </Pressable>
    </View>
  );
}
