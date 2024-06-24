import { DashboardList } from "./dashboard-list";

export default function Dashboard() {
  return (
    <main className="flex h-min-screen h-screen justify-center mt-24">
      <div className="grid gap-5 grid-cols-3 h-1/2 w-3/4">
        <DashboardList />
      </div>
    </main>
  )
}