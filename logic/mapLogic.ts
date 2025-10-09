export const cvCountries = "worked";

export const myCountries = {
  [cvCountries]: ["Russia", "Georgia", "Hungary"],
  visited: [
    "Vietnam", "Uzbekistan", "United Arab Emirates", "Ukraine", "Turkey", 
    "Spain", "Singapore", "Portugal", "Poland", "Philippines", "Netherlands", 
    "Morocco", "Mongolia", "Malaysia", "Lithuania", "Latvia", "Laos", "Kyrgyzstan", "Japan", "Italy", 
    "Israel", "Iran", "Indonesia", "Greece", "France", "Finland", "Estonia", "Czechia", "Croatia", 
    "China", "Cambodia", "Bulgaria", "Brazil", "Belarus", "Azerbaijan", "Armenia", "Argentina"
  ],
  experienced: ["Kazakhstan", "Thailand", "Tajikistan", "Nepal", "India"]
};

export function getColor(country: string, activeFilter?: string): string {
  // When "visited" filter is active, show all countries in visited color
  if (activeFilter === "visited") {
    return "var(--color-visited)";
  }
  
  if (myCountries.worked.includes(country)) {
    return "var(--color-worked)";
  }
  if (myCountries.visited.includes(country)) {
    return "var(--color-visited)";
  }
  if (myCountries.experienced.includes(country)) {
    return "var(--color-experienced)";
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
