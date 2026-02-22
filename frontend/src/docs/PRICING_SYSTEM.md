# Centralized Pricing System

## Overview
All pricing in the SaaSy Cookies application is centralized and managed through a shared system to ensure consistency across all components. The system uses simplified price values since all prices are the same numerical value across currencies.

## Architecture

### 1. Core Files
```
src/
├── constants/
│   └── pricingConstants.js     # Simple pricing data (79, 149, 249)
├── hooks/
│   └── usePricing.js            # Centralized pricing hook
├── utils/
│   └── currencyMapping.js       # Currency formatting utilities
└── docs/
    └── PRICING_SYSTEM.md        # This documentation
```

### 2. Data Flow
```
User selects country → localStorage → usePricing Hook → Components
                                    ↓
                              Country-specific pricing display
```

## Single Source of Truth

### Currency & Formatting: `src/utils/currencyMapping.js`
- **Currency mapping** for NZ, AU, OTHER
- **Price formatting** utilities
- **Country code mapping** functions

### Pricing Data: `src/constants/pricingConstants.js`
- **Simple pricing data** (`PRICING_TIERS` with price: 79, 149, 249)
- **Country-specific formatting** (`getPricingTiersForCountry`)
- **Helper functions** for plan lookup

### Hook Interface: `src/hooks/usePricing.js`
- **Country persistence** across sessions
- **Simple price access** via `getPrice()` function
- **Loading states** for initialization

## Simplified Pricing Logic

### Key Principle
Since all prices are the same numerical value across countries ($79, $149, $249), we store the price once and apply country-specific formatting only for display.

### Price Storage
```javascript
export const PRICING_TIERS = [
  {
    name: "Starter Presence",
    price: 79,        // Simple number - same across all currencies
    planId: "starter",
    // ... other properties
  },
  {
    name: "Growth Engine", 
    price: 149,       // Simple number - same across all currencies
    planId: "growth",
    // ... other properties
  },
  {
    name: "Authority System",
    price: 249,       // Simple number - same across all currencies
    planId: "authority",
    // ... other properties
  }
];
```

### Currency Display Logic
```javascript
// Price stored once: 79
// Display varies by country:
// NZ: "$79/month" (NZD)
// AU: "$79/month" (AUD) 
// OTHER: "$79/month" (USD)
```

## Currency System

### Supported Countries
- **NZ (New Zealand)**: NZD
- **AU (Australia)**: AUD  
- **OTHER**: USD (default)

### Price Display
All prices show the same numerical value across currencies:
- $79 NZD = $79 AUD = $79 USD
- $149 NZD = $149 AUD = $149 USD
- $249 NZD = $249 AUD = $249 USD

### Country Selection
- **Mandatory field** in the AI SaaS Brief form
- **User must select** their country (NZ, AU, or Other)
- **Persists across sessions** via localStorage
- **Determines currency** for pricing display

## Usage Patterns

### 1. Using the Pricing Hook (Recommended)

```javascript
import { usePricing } from '../hooks/usePricing';

function MyComponent() {
  const { 
    pricingTiers, 
    country, 
    currency, 
    isLoading,
    getPrice, 
    getFormattedPrice 
  } = usePricing();
  
  // Get simple price
  const starterPrice = getPrice('starter'); // 79
  
  // Get formatted price for current country
  const formattedPrice = getFormattedPrice('starter'); // "$79/month"
  
  return (
    <div>
      {isLoading ? (
        <div>Loading pricing...</div>
      ) : (
        pricingTiers.map(tier => (
          <div key={tier.planId}>
            <h3>{tier.name}</h3>
            <p>{tier.price}</p>
            <p>Currency: {currency.code}</p>
          </div>
        ))
      )}
    </div>
  );
}
```

### 2. Direct Currency Functions

```javascript
import { 
  formatPriceForCountry, 
  getCurrencyForCountry
} from '../utils/currencyMapping';

// Format price for specific country
const formattedPrice = formatPriceForCountry(79, 'AU'); // "$79"

// Get currency info
const currency = getCurrencyForCountry('AU');
// { code: 'AUD', symbol: '$', name: 'Australian Dollar', locale: 'en-AU' }
```

## Components Using Centralized Pricing

### 1. RequestAISaaSBriefPage
- Uses `usePricing` hook
- Displays country-specific pricing in plan comparison modal
- Saves country to localStorage for persistence
- Uses `getPrice()` for Stripe checkout values

### 2. PricingPage  
- Uses `usePricing` hook
- Displays pricing based on user's selected country
- Shows loading state during initialization
- Uses country from localStorage

### 3. Stripe Checkout
- Uses simple price values for payment processing
- Includes currency code for proper Stripe handling
- Integrates with centralized price IDs

## Country Selection & Persistence

### Manual Selection
1. User fills AI SaaS Brief form → Selects country (mandatory field)
2. Country saved to localStorage for persistence
3. All pricing components use selected country
4. Country persists across browser sessions

### Manual Updates
```javascript
import { usePricing } from '../hooks/usePricing';

function CountrySelector() {
  const { updateCountry } = usePricing();
  
  return (
    <select onChange={(e) => updateCountry(e.target.value)}>
      <option value="NZ">New Zealand</option>
      <option value="AU">Australia</option>
      <option value="OTHER">Other</option>
    </select>
  );
}
```

## Helper Functions

### From usePricing Hook
```javascript
const { getPrice, getFormattedPrice } = usePricing();

// Get simple price for specific plan
const price = getPrice('starter'); // 79

// Get formatted price for current country
const price = getFormattedPrice('starter'); // "$79/month" (varies by country)
```

### From currencyMapping.js
```javascript
import { 
  formatPriceForCountry, 
  getCurrencyForCountry
} from '../utils/currencyMapping';

// Format price for specific country
const price = formatPriceForCountry(79, 'AU'); // "$79"

// Get currency info
const currency = getCurrencyForCountry('AU');
// { code: 'AUD', symbol: '$', name: 'Australian Dollar', locale: 'en-AU' }
```

### From pricingConstants.js
```javascript
import { getPlanByName, getPlanById } from '../constants/pricingConstants';

// Find plan by name
const plan = getPlanByName('Starter Presence');

// Find plan by ID
const plan = getPlanById('starter');
```

## Removed Duplicate Files

The following duplicate files have been removed to ensure single source of truth:

### ❌ Deleted Files
- `src/utils/currencyUtils.js` - Functions moved to `currencyMapping.js`
- `src/utils/stripeService.js` - Replaced with simplified version using centralized system

### ✅ Consolidated Files
- `src/utils/currencyMapping.js` - Now contains ALL currency & geolocation logic
- `src/hooks/usePricing.js` - Enhanced with automatic geolocation
- `src/utils/stripeService.js` - Simplified to use centralized system

## Migration Guide

### For New Components
1. Import `usePricing` hook
2. Use `pricingTiers` for display
3. Handle `isLoading` state during geolocation
4. Use `getPrice()` for Stripe/processing
5. Use `getFormattedPrice()` for display

### For Existing Components
1. Replace direct currency imports with `usePricing`
2. Update pricing display to use hook data
3. Remove duplicate currency utility imports
4. Add loading states for geolocation
5. Replace `getBasePrice()` with `getPrice()`

## Benefits

### 1. Single Source of Truth
- ✅ **All pricing** comes from `PRICING_TIERS` (simple price values: 79, 149, 249)
- ✅ **All currency logic** in `currencyMapping.js`
- ✅ **One place to update** prices or add countries
- ✅ **No duplication** across components
- ✅ **Simplified structure** - no unnecessary basePriceNZD fields

### 2. User Experience
- ✅ **Mandatory country selection** ensures proper currency display
- ✅ **Persistent selection** across sessions
- ✅ **Loading states** during initialization
- ✅ **Consistent pricing** across all components
- ✅ **Same price values** across all currencies

### 3. Maintainability
- ✅ **Centralized logic** reduces duplication
- ✅ **Easy to add new countries** or currencies
- ✅ **Clear separation** of concerns
- ✅ **Type-safe pricing data**
- ✅ **Simple price structure** - easy to understand and modify

### 4. Developer Experience
- ✅ **Simple hook API** with clear methods
- ✅ **Loading states** built-in
- ✅ **Clear documentation** and examples
- ✅ **Consistent patterns** across components
- ✅ **Intuitive function names** (`getPrice` vs `getBasePrice`)

## Future Enhancements

### Planned Features
- [ ] Additional country support
- [ ] Currency conversion rates (if needed)
- [ ] Dynamic pricing based on market conditions
- [ ] A/B testing different price points

### Extension Points
The system is designed to easily support:
- Additional countries via `currencyMapping.js`
- Different pricing models via `pricingConstants.js`
- Promotional pricing via hook modifications
- Enhanced country selection UI

## Why This Simplified Logic Works

### The Problem We Solved
Originally, we had unnecessary complexity with automatic geolocation detection, even though users must select their country in the mandatory form field.

### The Solution
1. **User selects country** - Mandatory field in AI SaaS Brief form
2. **Store selection** - Save to localStorage for persistence
3. **Format per country** - Add currency symbol when displaying
4. **Maintain consistency** - Same price values everywhere
5. **Reduce complexity** - No unnecessary API calls or detection logic

### Benefits of This Approach
- **Cleaner code** - Less complexity, clearer intent
- **Better performance** - No API calls, simpler logic
- **User control** - Users choose their own country
- **Easier maintenance** - No geolocation dependencies
- **Intuitive API** - `getPrice()` returns the actual price

This simplified approach makes perfect sense because:
- Users must select country anyway (mandatory field)
- Automatic detection is unnecessary overhead
- Only the currency symbol and code change based on selection
- The formatting layer handles all country-specific display logic
- User choice is more reliable than IP-based detection
