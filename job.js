import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fetch from 'node-fetch'
import { presignedUrl } from "./s3.js";

puppeteer.use(StealthPlugin());

const  downloadImage=async(imageSrc)=> {
 
    const image=await fetch(imageSrc);
    const imageData=await image.arrayBuffer();
    const r= await presignedUrl(1);
    const response=await fetch(r.urls[0],{method:"PUT",body:imageData, headers: {
     "Content-Type": "image/png"}});
     if(response.status===200)
     {
       return `https://signedayush.s3.ap-south-1.amazonaws.com/${r.keys[0]}`;
     }

   
 
 }

export const test=async(url)=> {

    const browser = await puppeteer.launch({
        headless: 'new',
        args: [ "--no-sandbox"]
      });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  let userId;
  await page.goto(url, { waitUntil: "networkidle0",timeout:60000 });

  const result = await page.evaluate(async() => {
    const userIDClass = document.getElementsByClassName(
"x1lliihq x1plvlek xryxfnj x1n2onr6 x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye x1ms8i2q xo1l8bm x5n08af x10wh9bi x1wdrske x8viiok x18hxmgj"    );
    console.log(userIDClass)
    const name = document.getElementsByClassName(
      "x1lliihq x1plvlek xryxfnj x1n2onr6 x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp x1s688f x5n08af x10wh9bi x1wdrske x8viiok x18hxmgj"  )       
   
   
      userId = userIDClass[0]?.textContent;
    const detailsClass = document.getElementsByClassName(
      "html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs"
    );
    const imageElement = document.getElementsByClassName('xpdipgo x972fbf xcfux6l x1qhh985 xm0m39n xk390pu x5yr21d xdj266r x11i5rnm xat24cr x1mh8g0r xl1xv1r xexx8yu x4uap5 x18d9i69 xkhd6sd x11njtxf xh8yej3')[0];
    const imageSrc = imageElement ? imageElement.src : null;

    console.log(imageSrc);
    console.log("hello")
    return {
        iaccountID:userId,
        ifollowers: detailsClass[1]?.textContent,
        name:name[0]?.textContent,
        profilePic:imageSrc,
    }

});
console.log(result)
    result.profilePic=await downloadImage(result.profilePic);
    await browser.close();
   return result;
   
}
     

