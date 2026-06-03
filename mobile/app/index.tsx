import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import HeaderMobile from "../src/components/HeaderMob";
import SearchBarMob from "../src/components/SearchBar";
import LoanCard from "../src/components/CardLoans";
import { Loan } from "../src/services/loans";

const App: React.FC = () => {
  const [results, setResults] = useState<Loan[]>([]);
  return (
    <View className="flex-1 bg-zinc-50">
      <HeaderMobile />
      <SearchBarMob onResults={setResults} />
      {results.length > 0 && (
        <Text className="mt-8 mx-6 text-gray-400 text-sm">
          {results.length} empréstimo(s) encontrado(s)
        </Text>
      )}
      <ScrollView>
        {results.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </ScrollView>
    </View>
  );
};

export default App;
