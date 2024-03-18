import puppeteer from 'puppeteer';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { delay } from './delay.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const imagesDirectory = path.join(__dirname, 'images');

dotenv.config();

const websiteURL = process.env.VIIT_URL;

const attendanceIframeURL = process.env.ATTENDANCE_URL;

const getAttendance = async ({ username, password, socket }) => {
  //testing
  // const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  try {
    // await page.setViewport({ width: 1920, height: 1080 });

    socket.emit('scrp', 'Navigating to website...');
    await page.goto(websiteURL);

    socket.emit('scrp', 'Typing username...');
    await page.type('#txtId2', username);

    socket.emit('scrp', 'Typing password...');
    await page.type('#txtPwd2', password);

    await delay(1500);

    socket.emit('scrp', 'Clicking login button...');
    await page.click('#imgBtn2');

    await delay(1000);

    const loginErrorSelector = await page.$('#lblError1');

    const loginErrorInnerHTML = loginErrorSelector
      ? await page.evaluate((el) => el.innerHTML, loginErrorSelector)
      : null;

    if (loginErrorInnerHTML) {
      throw new Error(`${loginErrorInnerHTML}`);
    }

    await page.goto(attendanceIframeURL);

    // await delay(1500);

    await page.click('#radTillNow');

    // await delay(1500);

    await page.click('#btnShow');

    // await delay(1500);

    const elementSelector =
      '#tblReport > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(22) > td:nth-child(4)';

    const attendanceValue = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element ? element.innerHTML : null;
    }, elementSelector);

    if (attendanceValue === null) {
      throw new Error('Failed to retrieve attendance value.');
    }

    socket.emit('scrpSucc', `${attendanceValue}`);

    // await page.screenshot({
    //   path: path.join(imagesDirectory, `attend.png`),
    // });

    await browser.close();
  } catch (error) {
    socket.emit('scrpErr', `Error: ${error.message}`);
    await browser.close();
    socket.disconnect();
  }
};

export { getAttendance };
