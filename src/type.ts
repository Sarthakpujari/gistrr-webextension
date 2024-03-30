export interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  brainList: any[];
  setBrainList: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface BrainContextType {
  brainList: any[];
  getBrainList: () => void;
}
