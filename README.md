
# Dorsal

Dorsal is a React application powered by Vite. This guide provides instructions for setting up and running the application locally.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or above recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/dorsal-fyi/dorsal-landing-v1.git
```

2. **Install frontend dependencies**

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

3. **Setup Frontend Environment Variables**
Create a .env file in the root of the project and add the following variables:
```bash
VITE_MAP_ACCESS_TOKEN=zt7wt1ZXSBmlye8q8IQ6HuOv6p4idsbIbLl3Qi2ns2X4ZcbQbarIZpGE6YAkfi6L
VITE_API_BASE_URL=https://dorsaldata1.apurbatech.io
VITE_LANDING_BASE_URL=http://localhost:5000
SPREADSHEET_ID=1RObH1iusEgiHa25fmCE5fksFg2B5XjaUMjxAibNBpq0
GOOGLE_CLIENT_EMAIL=voting-api@dorsal-fyi.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChrOf4+xTkOMBv\nYsE2/z6Dg3UoBkS+IyBje1GHDKrzAWSqr3XG25ydDOr81prZ0y2r5jKHBzCI2c7g\n/Mx1gLHyqK7SgdODPc21Yd/1LaB1O9nBC/cX2T7ltPiVP9iNf5imJo7fVpE1DbUG\nQFDi0dCDQJd6yA6OehjYEs3U8wkxESHNZfkPWWi6xg2j6fZH1oaUlRAPrOCsDkvM\njhfOGIxJN9OXTSIO58GJEWlndYiXhdcIBuGMzdlXWfbnSLKfMR5rrsojpvHaRcRb\n1xWw3F1PjC2PStw3fPLPJhipZkkcYGgBmST4NW3UibT6GTyvzo1pDzjxmFJbHtMz\ne0Jm9lNRAgMBAAECggEAA6JAQH9cM9j2sko074iDHi+ZNYIWj3N4qeO+rFtjiDyy\nx4dUDVkoRvtgWLh2GIk/kIqG/jPyKlFC7hmges+esEaMT1ztpRiBhB8kCn2xCpGC\nzmz3a8jNOhp8L9aUhnGku69ILMrkTp31QKO3bbGrjxenj/HpKdiisFCT4cJopXqk\n8U1gw69pQ2efzNJsQw/Znfvi8nM+Z+tHAHpuUiDr04cTTblz3oM4NPuSYfjmy/FI\n0wpoh6KNJKQ9KByd87pacCGLwozDFrfrTsGnSCNvM5I2gF/ATSlfAsp93mLSj2mV\nqBTKYvImkvD1NDGa2SwtZmxCLLlyXDW5p5AIfw+scQKBgQDUzaigq+O/6B8mUlrb\nTESPLKnv2ztyWr/y38MgsJl1w7vW3izBPk7PxY9W/DHF1MxbrSsh9PX/l8NMHkMm\nZZTU8TdDWz5/F2GSrschpqF1k4ELHOInjGDBQ0Ai4o6Gsibq0Jo8FhuCjoxj2b1T\nqhnbndlsxcdfE97gQd7yDJemZQKBgQDCfmFlaYMM9fOvc+6BFwKkL95zZOYShorX\nfX0j22mLlMudWDD1luHQL6Wi6/9TYpoQwxhNv/nHd2WxJ5sAFhpu7xYL5KVW3t75\nxToBSNh6aqKr0RVXLo5Yy8R6DlOCw+Cq9SHvXAMPwR4jkNZtqqH/uTHexStPGgxa\n/ziLmcaEfQKBgQCbrk0kJjw65A0N0wgHETfC6rDz+ZX25e8xNoQhATFzlxtvaSCi\nyvuLQwPHZj7fdPuAQiKg9/2T3CoTILyNdZk5Y7LDQxhoj+lhDx49PxM12hB42cuV\nlTwfhxx/qPEOF30jIjMDrES58aFBV0UL1RCPu14aFmLx6q6Nr4Lz30R+hQKBgHOW\nsoGXzHfWcGX0y2lS6JH1lQoVjBq0dS2OeeHmk3qOCtjPQgGjEz8sIg+KnCrNbezK\nVdZXYrYmAnzfoeHSQRFu7DZTQ+Q1/mSIz2lWBrnySA0+7KTsmVKyf2levEj56rsP\nhoR/tZ4WUrgmaxmwECkvwjC4E34mZ/NovQ1SbcXtAoGAMLCEn5fe666j4kl+Jyb7\npGvgBbBxAjQWOuO4qTiie87bEeEELGztsVMCFpyftgLmhR56WTEmB+vIBA6AIs5q\n4GE3jFsm4XsmnsCn90pbWFDV9f1MK897YjlrCMQUA/5BQZ0omI6sX0wLt9Gkrh45\nKIKEbuty3OUCSJGRZ7JSPAo=\n-----END PRIVATE KEY-----\n"
```
In production, please change the VITE_LANDING_BASE_URL=https://www.dorsal.fyi/

4. **Running the App**

🖥️ Running the Frontend

To start the development server:
```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Build the project
```bash
npm run build
```

5. **Setup Backend for roadmap votes API**

Start the backend API express server
```bash
node server.js
```
