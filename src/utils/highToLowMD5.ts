// 32位转16位
function highToLowMD5(str: string): string {
  return str.slice(8, 24);
}
export default highToLowMD5;
