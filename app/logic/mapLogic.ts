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
    return "#60a5fa";
  }
  if (myCountries.visited.includes(country)) {
    return "#4ade80";
  }
  if (myCountries.experienced.includes(country)) {
    return "#f472b6";
  }
  return "#cbd5e1";
}

export function shouldShowCountry(country: string, activeFilter: string): boolean {
  return myCountries[activeFilter as keyof typeof myCountries]?.includes(country) || false;
}
