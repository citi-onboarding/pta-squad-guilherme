import Widget from "../../components/Widget";
import BooksChart from "../../components/dashboard/BooksByCategoryChart";

export default function Dashboard() {
  return (
    <div className="w-full max-w-[1450px] mx-auto p-6 flex flex-col gap-6">
      <Widget />
      <BooksChart />
    </div>
  );
}
