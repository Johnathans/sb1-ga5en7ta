# 🌍 Flipped Lingo - Language Learning Platform

A modern, interactive language learning platform built with React, TypeScript, and Tailwind CSS. Master any language through smart flashcards, interactive stories, and comprehensive vocabulary systems.

![Flipped Lingo](https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🎯 **Core Learning Tools**
- **Smart Flashcards** - Interactive spaced repetition system
- **20 Languages** - Comprehensive support for major world languages
- **Interactive Stories** - Audio-enabled immersive reading experiences
- **Vocabulary Browser** - Categorized word lists with pronunciation
- **Sentence Practice** - Real-world usage examples
- **Progress Tracking** - Detailed analytics and achievement system

### 🎨 **Modern Design**
- **Beautiful UI** - Clean, production-ready interface
- **Responsive Design** - Perfect on all devices
- **Dark/Light Themes** - Elegant color schemes
- **Smooth Animations** - Delightful micro-interactions
- **Accessibility** - WCAG compliant design

### 🚀 **Advanced Features**
- **User Profiles** - Personalized learning journeys
- **Custom Decks** - Create your own flashcard collections
- **Language Switching** - Seamlessly switch between target languages
- **Audio Support** - Native pronunciation guides
- **Offline Ready** - Local storage for uninterrupted learning

## 🌐 Supported Languages

| Language | Code | Native Name | Status |
|----------|------|-------------|--------|
| 🇪🇸 Spanish | `es` | Español | ✅ Complete |
| 🇫🇷 French | `fr` | Français | ✅ Complete |
| 🇩🇪 German | `de` | Deutsch | ✅ Complete |
| 🇯🇵 Japanese | `ja` | 日本語 | ✅ Complete |
| 🇧🇷 Portuguese | `pt` | Português | ✅ Complete |
| 🇮🇹 Italian | `it` | Italiano | 🔄 In Progress |
| 🇷🇺 Russian | `ru` | Русский | 🔄 In Progress |
| 🇰🇷 Korean | `ko` | 한국어 | 🔄 In Progress |
| 🇨🇳 Chinese | `zh` | 中文 | 🔄 In Progress |
| 🇸🇦 Arabic | `ar` | العربية | 🔄 In Progress |

*And 10 more languages coming soon!*

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks + Local Storage
- **Deployment**: Ready for Netlify/Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Johnathans/flippedlingo.git
   cd flippedlingo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
flippedlingo/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx    # Main user dashboard
│   │   ├── StudyMode.tsx    # Flashcard study interface
│   │   ├── VocabularyIndex.tsx # Vocabulary browser
│   │   ├── StoriesIndex.tsx # Interactive stories
│   │   └── ...
│   ├── data/               # Static data and content
│   │   ├── languages.ts    # Language definitions
│   │   ├── sampleDecks.ts  # Pre-built flashcard decks
│   │   ├── vocabularyData.ts # Vocabulary database
│   │   └── storiesData.ts  # Story content
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and business logic
│   ├── types/              # TypeScript definitions
│   └── App.tsx             # Main application component
├── public/                 # Static assets
└── package.json
```

## 🎯 Key Components

### **Dashboard**
- User profile management
- Progress tracking
- Quick access to all learning tools
- Language switching interface

### **Study Mode**
- Interactive flashcard system
- Progress tracking
- Spaced repetition algorithm
- Beautiful card flip animations

### **Vocabulary Browser**
- Searchable word database
- Category filtering
- Difficulty levels
- Audio pronunciation
- Quick study mode

### **Interactive Stories**
- Line-by-line audio narration
- Translation toggle
- Progress tracking
- Immersive reading experience

## 🔧 Configuration

### Environment Variables

Create a `.env` file for API integrations:

```env
VITE_GOOGLE_TRANSLATE_API_KEY=your_api_key_here
VITE_DICTIONARY_API_KEY=your_api_key_here
```

### Adding New Languages

1. Add language definition to `src/data/languages.ts`
2. Create vocabulary data in `src/data/vocabularyData.ts`
3. Add sample decks in `src/data/sampleDecks.ts`
4. Include stories in `src/data/storiesData.ts`

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design
- Add proper error handling
- Include JSDoc comments for functions
- Test on multiple devices

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core flashcard system
- ✅ Multi-language support
- ✅ User profiles and progress tracking
- ✅ Interactive stories
- ✅ Vocabulary browser

### Phase 2 (Next)
- 🔄 Audio pronunciation system
- 🔄 Spaced repetition algorithm
- 🔄 Community features
- 🔄 Mobile app (React Native)
- 🔄 Offline mode

### Phase 3 (Future)
- 📋 AI-powered personalization
- 📋 Live conversation practice
- 📋 Gamification system
- 📋 Teacher dashboard
- 📋 API for third-party integrations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Language Data**: Curated from various open-source dictionaries
- **Images**: Pexels for beautiful stock photography
- **Icons**: Lucide React for consistent iconography
- **Inspiration**: Modern language learning platforms

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Johnathans/flippedlingo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Johnathans/flippedlingo/discussions)
- **Email**: support@flippedlingo.com

---

<div align="center">

**Made with ❤️ for language learners worldwide**

[🌐 Live Demo](https://flippedlingo.netlify.app) • [📖 Documentation](https://docs.flippedlingo.com) • [🐛 Report Bug](https://github.com/Johnathans/flippedlingo/issues)

</div>