import Colors from "../constants/Colors";

export const getMarkRanks = (val, isAu) => {
  if (val < 0.1) return ["--", Colors.na];
  
  if (!isAu) {
    if(val < 60) return ["F", Colors.fl];
    if(val < 70) return ["D", Colors.ps];
    if(val < 80) return ["C", Colors.cr];
    if(val < 90) return ["B", Colors.dn];
    return ["A", Colors.hd];
  } else {
    if(val < 50) return ["FL", Colors.fl];
    if(val < 65) return ["PS", Colors.ps];
    if(val < 75) return ["CR", Colors.cr];
    if(val < 85) return ["DN", Colors.dn];
    return ["HD", Colors.hd];
  }
}