# 🌟 Lexi AI

Lexi AI is a mobile app built with **Expo + React Native** to help individuals with **dyslexia** and **ADHD** read more comfortably.  
It allows users to **scan or upload text from images**, and then uses **AI (ChatGPT)** to rewrite that text in a simpler, easier-to-read format.

---

## 📱 Features

- 📸 **Scan or Upload Text:** Extract text from any image using the OCR.Space API  
- 🧠 **AI Simplification:** Automatically rewrite the text using OpenAI’s GPT API  
- 💾 **History Tracking:** Save and revisit previous simplifications with AsyncStorage  
- 🔊 **Text-to-Speech:** Listen to the simplified content with Expo Speech  
- 🎨 **Modern UI:** Clean, accessible design with the Lexend font for better readability  

---

## 🧩 Tech Stack

- **Framework:** Expo (React Native + TypeScript)  
- **APIs:**  
  - OCR.Space API (text extraction)  
  - OpenAI GPT API (text simplification)  
- **Storage:** AsyncStorage for local history  
- **Speech:** Expo Speech for text-to-voice conversion  

---

## 🧠 How It Works

1. The user uploads or captures an image.  
2. The app sends it to **OCR.Space**, which extracts the text.  
3. The extracted text is sent to **OpenAI**, which simplifies it for dyslexic and ADHD readers.  
4. The simplified text appears on screen, and users can **listen** to it or **save** it.  

---

## 🧰 Installation & Setup

Make sure you have **Node.js**, **npm**, and **Expo CLI** installed.

```bash
# Clone this repository
git clone https://github.com/muhaalal/LexiAI.git

# Navigate to the project folder
cd LexiAI

# Install dependencies
npm install

# Start the development server
npx expo start
