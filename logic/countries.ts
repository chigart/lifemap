export const cvCountries = "worked";

export const myCountries = {
  [cvCountries]: ["Russia", "Georgia", "Hungary"],
  explored: ["Kazakhstan", "Thailand", "Tajikistan", "Nepal", "India", "Turkey", "Laos", "Kyrgyzstan", "Russia", 
    "Indonesia", "Argentina", "Georgia"],
  visited: [
    "Vietnam", "Uzbekistan", "United Arab Emirates", "Ukraine", 
    "Spain", "Singapore", "Portugal", "Poland", "Philippines", "Netherlands", 
    "Morocco", "Mongolia", "Malaysia", "Lithuania", "Latvia", "Japan", "Italy", 
    "Israel", "Iran", "Greece", "France", "Finland", "Estonia", "Czechia", "Croatia", 
    "China", "Cambodia", "Bulgaria", "Brazil", "Belarus", "Azerbaijan", "Armenia"
  ]
};

export function getColor(country: string, activeFilter?: string): string {
  if (activeFilter === "visited") {
    return "var(--color-visited)";
  }
  
  if (activeFilter && myCountries[activeFilter as keyof typeof myCountries]?.includes(country)) {
    switch (activeFilter) {
      case "worked":
        return "var(--color-worked)";
      case "explored":
        return "var(--color-explored)";
    }
  }
  
  return "var(--color-default)";
}

export function shouldShowCountry(country: string, activeFilter: string): boolean {
  // When "visited" filter is active, show all countries from all categories
  if (activeFilter === "visited") {
    return Object.values(myCountries).some(countryList => countryList.includes(country));
  }
  
  return myCountries[activeFilter as keyof typeof myCountries]?.includes(country) || false;
}
