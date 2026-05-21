import Widget from "../../components/Widget";
import BooksChart from "../../components/dashboard/BooksByCategoryChart";

export default function Dashboard() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <Widget />
      <BooksChart />
    </div>
  );
}
