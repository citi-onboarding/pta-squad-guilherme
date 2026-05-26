import { useState } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { Search } from "lucide-react-native";
import { loans, Loan } from "../mocks/loans";

type props = {
  onResults: (results: Loan[]) => void;
};

export default function SearchBarMob({ onResults }: props) {
  const [pressed, setPressed] = useState(false);
  const [search, SetSearch] = useState("");
  const SearchingLoan = () => {
    const filtered = loans.filter(
      (loan) =>
        loan.Name.toLowerCase().includes(search.toLowerCase()) ||
        loan.bookName.toLowerCase().includes(search.toLowerCase()),
    );
    onResults(filtered);
  };
  return (
    <View className="mx-7 mt-7 ">
      {/* Input */}
      <View className="bg-white flex-row items-center border rounded-lg border-gray-200 px-3 py-3 gap-2">
        <Search size={18} color="gray" />
        <TextInput
          placeholder="Buscar por nome ou título..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={SetSearch}
          autoCorrect={false}
          autoCapitalize="none"
          className="flex-1 text-gray-700 "
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
        <Text
          className="text-white"
          style={{ fontWeight: "600", fontSize: 16 }}
        >
          Buscar
        </Text>
      </Pressable>
    </View>
  );
}
