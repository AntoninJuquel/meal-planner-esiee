export type RecipeRequest = {
  query: string;
  offset?: number;
  number?: number;
};

export type RecipeResponse = {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
};

export type Recipe = {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  aggregateLikes: number;
  healthScore: number;
  spoonacularScore?: number;
  pricePerServing: number;
  analyzedInstructions: AnalyzedInstruction[];
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic?: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30?: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: ExtendedIngredient[];
  summary: string;
  winePairing: WinePairing;
  originalId: null;
  nutrition: Nutrition;
};

export type Nutrition = {
  nutrients: Nutrient[];
  properties: Property[];
  flavonoids: Flavonoid[];
  ingredients: IngredientDetail[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
};

export type Nutrient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export type Property = {
  name: string;
  amount: number;
  unit: string;
};

export type Flavonoid = {
  name: string;
  amount: number;
  unit: string;
};

export type IngredientDetail = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Nutrient[];
};

export type CaloricBreakdown = {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
};

export type WeightPerServing = {
  amount: number;
  unit: string;
};

export type AnalyzedInstruction = {
  name: string;
  steps: Step[];
};

export type Step = {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
};

export type Ingredient = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type Equipment = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type ExtendedIngredient = {
  aisle: string;
  amount: number;
  consistency: string;
  id: number;
  image: string;
  measures: Measures;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
};

export type Measures = {
  us: Us;
  metric: Metric;
};

export type Us = {
  amount: number;
  unitShort: string;
  unitLong: string;
};

export type Metric = {
  amount: number;
  unitShort: string;
  unitLong: string;
};

export type WinePairing = {
  pairedWines: string[];
  pairingText: string;
  productMatches: ProductMatch[];
};

export type ProductMatch = {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  averageRating: number;
  ratingCount: number;
  score: number;
  link: string;
};

export enum Diet {
  None = 'None',
  GlutenFree = 'gluten free',
  Ketogenic = 'ketogenic',
  Vegetarian = 'vegetarian',
  LactoVegetarian = 'lacto-vegetarian',
  OvoVegetarian = 'ovo-vegetarian',
  Vegan = 'vegan',
  Pescatarian = 'pescatarian',
  Paleo = 'paleo',
  Primal = 'primal',
  LowFodmap = 'low-fodmap',
  Whole30 = 'whole30',
}
