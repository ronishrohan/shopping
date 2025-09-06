import { Header } from "@/components/layout/header"
import { NavigationTabs } from "@/components/account/navigation-tabs"
import { ProfileCard } from "@/components/account/profile-card"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your profile and account settings</p>
        </div>

        <NavigationTabs />

        <div className="mt-8">
          <ProfileCard />
        </div>
      </main>
    </div>
  )
}
