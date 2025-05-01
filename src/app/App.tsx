import { BrowserRouter as Router } from "react-router-dom"
import { AppProviders } from "./providers.tsx"
import { Header, Footer } from "../widgets/layout/ui/index.ts"
import PostsManagerPage from "../pages/PostsManagerPage.tsx"

const App = () => {
  return (
    <Router>
      <AppProviders>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </AppProviders>
    </Router>
  )
}

export default App
