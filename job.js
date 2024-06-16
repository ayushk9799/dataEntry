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
  await page.setRequestInterception(true);
  function extractUsername(url) {
    const regex = /instagram\.com\/([^/?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
const username=extractUsername(url);

  page.on('request', (request) => {
    request.continue();
  });

  let apiResponseData = {};

  page.on('response', async (response) => {
    try {
      const requestUrl = response.url();
      if (requestUrl.includes('https://www.instagram.com/api/graphql')) {  
        const responseData = await response.json();
        apiResponseData = responseData; 
        console.log(apiResponseData)
      }
    } catch (err) {
      console.log(err);
    }
  });

  await page.goto(url, { waitUntil: "networkidle0",timeout:60000 });


await new Promise((resolve)=>setTimeout(resolve,5000));
    const result={
      iaccountID:apiResponseData.data.user.username,
      ifollowers: apiResponseData.data.user.follower_count,
      name:apiResponseData.data.user.full_name,
              profilePic:apiResponseData.data.user.hd_profile_pic_url_info.url
    }
    console.log(result.profilePic)
    result.profilePic=await downloadImage(result.profilePic);
    console.log(result.profilePic)

     await browser.close();
    console.log(result)
   return result;
   
}
     

