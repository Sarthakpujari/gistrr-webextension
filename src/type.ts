export interface UserContextType {
  user: any; // Consider replacing 'any' with a more specific type
  setUser: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the user type
  brainList: any[]; // Replace 'any[]' with a more specific type if possible
  setBrainList: React.Dispatch<React.SetStateAction<any[]>>; // Replace 'any[]' with the brainList type
}
