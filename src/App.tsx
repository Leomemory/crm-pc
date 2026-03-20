import { AppRouter } from './app/router'
import { LocaleProvider } from './lib/locale'

function App() {
  return (
    <LocaleProvider>
      <AppRouter />
    </LocaleProvider>
  )
}

export default App
