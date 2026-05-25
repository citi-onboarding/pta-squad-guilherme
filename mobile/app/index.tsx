import { View, Text } from "react-native";
import HeaderMobile from "../src/components/HeaderMob";
import SearchBarMob from "../src/components/SearchBar";

const App: React.FC = () => (
  <View className="flex-1 bg-zinc-50">
    <HeaderMobile />
    <SearchBarMob />
  </View>
);

export default App;
