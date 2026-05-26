import { View, Image, Text } from "react-native";
import { Loan } from "../mocks/loans";
import { Calendar } from "lucide-react-native";
import {
  TechnologyBook,
  RomanceBook,
  SciencesBook,
  ChildrensBook,
  HistoryBook,
} from "@assets";

const LoanStatus = {
  DEVOLVIDO: {
    label: "Devolvido",
    className: "bg-emerald-100",
    textClass: "text-emerald-600",
    borderColor: "#a7f3d0",
  },
  EM_ANDAMENTO: {
    label: "Em andamento",
    className: "bg-yellow-100",
    textClass: "text-yellow-600",
    borderColor: "#fde68a",
  },
  ATRASADO: {
    label: "Atrasado",
    className: "bg-red-100",
    textClass: "text-red-400",
    borderColor: "#fca5a5",
  },
};

const categoryImage = {
  Technology: TechnologyBook,
  Romance: RomanceBook,
  Sciences: SciencesBook,
  Children: ChildrensBook,
  History: HistoryBook,
};

export default function LoanCard({ loan }: { loan: Loan }) {
  const status = LoanStatus[loan.statusBook];
  const image = categoryImage[loan.category as keyof typeof categoryImage];

  return (
    <View
      className="mt-6 mx-6 bg-white rounded-xl flex-row"
      style={{
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }}
    >
      <View style={{ width: "30%", height: 140 }}>
        <Image
          source={image}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      <View style={{ width: "70%", flexShrink: 1 }} className="p-4">
        <Text className="mb-2"> {loan.bookName} </Text>
        <View
          className={`mb-2 self-start px-4 py-1 rounded-full ${status.className}`}
          style={{ borderWidth: 1, borderColor: status.borderColor }}
        >
          <Text className={`text-sm ${status.textClass}`}>{status.label}</Text>
        </View>

        <View className="flex-row items-center gap-2 mb-1">
          <Calendar size={18} color="gray" />
          <Text className="text-sm text-gray-500">
            Locação: {loan.dateBorrow}
          </Text>
        </View>
        <View className="flex-row items-center gap-2 mb-1">
          <Calendar size={18} color="gray" />
          <Text className="text-sm text-gray-500">
            Devolução: {loan.dateGiveBack}
          </Text>
        </View>
      </View>
    </View>
  );
}
