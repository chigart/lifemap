import { COUNTRY_COLORS } from "../constants/colors";

export const myCountries = {
  worked: ["Russia", "Georgia", "Hungary"],
  visited: [
    "Vietnam", "Uzbekistan", "United Arab Emirates", "Ukraine", "Turkey", 
    "Spain", "Singapore", "Portugal", "Poland", "Philippines", "Netherlands", 
    "Morocco", "Mongolia", "Malaysia", "Lithuania", "Latvia", "Laos", "Kyrgyzstan", "Japan", "Italy", 
    "Israel", "Iran", "Indonesia", "Greece", "France", "Finland", "Estonia", "Czechia", "Croatia", 
    "China", "Cambodia", "Bulgaria", "Brazil", "Belarus", "Azerbaijan", "Armenia", "Argentina"
  ],
  experienced: ["Kazakhstan", "Thailand", "Tajikistan", "Nepal", "India"]
};

export function getColor(country: string): string {
  if (myCountries.worked.includes(country)) {
    return COUNTRY_COLORS.worked;
  }
  if (myCountries.visited.includes(country)) {
    return COUNTRY_COLORS.visited;
  }
  if (myCountries.experienced.includes(country)) {
    return COUNTRY_COLORS.experienced;
  }
  return COUNTRY_COLORS.default;
}

export function shouldShowCountry(country: string, activeFilter: string): boolean {
  return myCountries[activeFilter as keyof typeof myCountries]?.includes(country) || false;
}
