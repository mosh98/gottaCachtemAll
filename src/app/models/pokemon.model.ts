//Define the interface 'Pokemon' with the properties 'name' and 'url'
export interface Pokemon {
  name: string;
  url: string;
  // property 'stats' to the interface 'Pokemon', list of object with hp, attack and other stats from the POKI API
  stats?: object[];
}
