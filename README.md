# Lexi AI  
Application designed to support neurodivergent learners through AI-based text simplification and inclusive design.

## Abstract
Lexi AI is a research-driven mobile application designed to explore how AI-based text simplification and accessible design choices affect reading comprehension, cognitive load, and user comfort. The system integrates optical character recognition (OCR), large language models, and dyslexia-friendly user interface principles to transform complex text into more readable formats.
---

## Research Motivation
Students with dyslexia, ADHD, and other learning differences often struggle with dense, visually complex text. While AI-based rewriting tools exist, there is limited empirical evaluation of how text simplification combined with visual design features (font, layout, color) impacts reading performance.

Lexi AI was developed to:
- Investigate the role of AI-assisted text simplification in reading accessibility
- Explore how formatting and design influence comprehension and cognitive effort
---

## System Architecture
Lexi AI follows a modular processing pipeline:

1. **Text Acquisition**
   - Image capture or upload via Expo Camera
   - Text extraction using the OCR.Space API

2. **Text Processing**
   - Extracted text is sent to a large language model via the OpenAI API
   - Prompt-engineered rewriting focused on clarity, reduced complexity, and structure

3. **Presentation Layer**
   - Simplified text rendered using the Lexend font
   - Structured formatting (paragraphs, bullet points, spacing)
   - Optional text-to-speech output
---

## Features
- OCR-based text extraction from images
- AI-driven text simplification
- Dyslexia-friendly UI using the Lexend font
- Structured text rendering with Markdown
- Text-to-speech support via Expo Speech
- Local history storage using AsyncStorage

---

## Technology Stack

### Frontend
- React Native (Expo)
- TypeScript/JavaScript
- Expo Camera, Speech, Navigation
- Lexend Font (`@expo-google-fonts/lexend`)
- React Native Markdown Display

### Backend / APIs
- OCR.Space API for text extraction
- OpenAI API for AI-based text simplification

### Storage
- AsyncStorage for local persistence  
- *(Planned)* Firebase Firestore for cloud synchronization
---

## Ongoing Research
Currently working on a small-scale study examining how AI-based text simplification and accessible design features influence reading speed, comprehension, and perceived cognitive effort in high school students.

## 🎬 Video Demonstration

[![Watch the video on Vimeo](https://i.vimeocdn.com/video/2075997929-c28a59231c3fca239d80abc1977beb8cfdaa392de135ee4b012334fc6519d92f-d_960x540?&r=pad&region=us)](https://vimeo.com/1131920715)

```bash
# Clone this repository
git clone https://github.com/muhaalal/LexiAI.git

# Navigate to the project folder
cd LexiAI

# Install dependencies
npm install

# Start the development server
npx expo start
