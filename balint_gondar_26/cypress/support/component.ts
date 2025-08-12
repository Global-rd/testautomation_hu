// Import commands.js using ES2015 syntax:
import './commands'
// Import types
import './types'

// Add custom commands here
declare global {
  namespace Cypress {
    interface Chainable {
      // Custom commands are defined in commands.ts
    }
  }
}
