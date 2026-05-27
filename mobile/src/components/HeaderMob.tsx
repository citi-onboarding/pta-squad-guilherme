import { LogoCiti } from "../assets";
import { View, Text, Image } from "react-native";

export default function HeaderMobile() {
  return (
    <View
      className="w-full bg-white py-5 px-10 shadow-md"
      style={{
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center gap-4">
        <Image
          source={LogoCiti}
          style={{ width: 70, height: 40 }}
          resizeMode="contain"
        />
        <Text className="text-xl">Meus Empréstimos</Text>
      </View>
    </View>
  );
}
