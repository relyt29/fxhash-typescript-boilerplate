const search = new URLSearchParams(window.location.search)
const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
const fxhash = search.get('fxhash') || "oo" + Array(49).fill(0).map(_=>alphabet[(Math.random()*alphabet.length)|0]).join('')
const b58dec = (str: any)=>[...str].reduce((p,c)=>p*alphabet.length+alphabet.indexOf(c)|0, 0)
const fxhashTrunc = fxhash.slice(2)
const regex = new RegExp(".{" + ((fxhash.length/4)|0) + "}", 'g')
const hashes = fxhashTrunc.match(regex)!.map(h => b58dec(h))
const sfc32 = (a: any, b: any, c: any, d: any) => {
  return () => {
    a |= 0; b |= 0; c |= 0; d |= 0
    var t = (a + b | 0) + d | 0
    d = d + 1 | 0
    a = b ^ b >>> 9
    b = c + (c << 3) | 0
    c = c << 21 | c >>> 11
    c = c + t | 0
    return (t >>> 0) / 4294967296
  }
} 
const fxrand = sfc32(hashes[0], hashes[1], hashes[2], hashes[3]);
//var fxrand = sfc32(...hashes)
// true if preview mode active, false otherwise
// you can append preview=1 to the URL to simulate preview active
const isFxpreview = search.get('preview') === "1"
// call this method to trigger the preview
function fxpreview() {
  console.log("fxhash: TRIGGER PREVIEW")
} 
  
export { fxhash, fxrand, isFxpreview, fxpreview }
