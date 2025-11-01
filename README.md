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

### Frontend
- **React Native** – Core UI framework for building cross-platform mobile apps
- **TypeScript** – Javascript superset that provides better debugging.
- **Expo Framework** – Simplifies setup and provides various tools (Camera, Speech, Navigation, etc.)
- **React Native Markdown Display** – Renders AI text in a structured format
- **@expo-google-fonts/Lexend** – Dyslexia-friendly font family used across the app
- **@expo/vector-icons (Ionicons)** – For icons and smooth UI visuals

### Backend / APIs
- **OCR.Space API** – Extracts printed text from images using OCR
- **OpenAI GPT-4 API** – Simplifies extracted text for ADHD and dyslexic readers
- **Firebase Authentication**– (Optional) Secure user login and account management

### Storage & Data
- **AsyncStorage** – Local storage for saving and retrieving simplification history
- **(Future plan)** Firebase Firestore – Cloud sync for multi-device history

### Development & Tooling
- **Node.js / npm** – Package management and dependency control
- **Git & GitHub** – Version control and open-source collaboration
- **Visual Studio Code (VS Code)** – Main editor and IDE

---

## 🧠 How It Works

1. The user uploads or captures an image.  
2. The app sends it to **OCR.Space**, which extracts the text.  
3. The extracted text is sent to **OpenAI**, which simplifies it for dyslexic and ADHD readers.  
4. The simplified text appears on screen, and users can **listen** to it or **save** it.  

---

## License
This project is licensed under the [MIT License]
You are free to use, modify, and distribute this software with attribution.

## 🧰 Installation & Setup

Make sure you have **Node.js**, **npm**, and **Expo CLI** installed.

## Video Demonstration

[![Demo on Vimeo](https://i.vimeocdn.com/video/123456789_640.jpg)](https://vimeo.com/1131920715)

```bash
# Clone this repository
git clone https://github.com/muhaalal/LexiAI.git

# Navigate to the project folder
cd LexiAI

# Install dependencies
npm install

# Start the development server
npx expo start
