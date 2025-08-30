# Evan J. Martin Productions

A professional portfolio website built with Next.js 15.5.2 and Railway PocketBase, showcasing high-quality audio productions with an enhanced streaming player.

## 🎵 Production Status

✅ **Live & Running** - Portfolio displaying 23 professional tracks  
✅ **Railway PocketBase** - Production database with real-time sync  
✅ **Enhanced Audio Player** - YouTube-style controls with quality selection  
✅ **Next.js 15.5.2** - Latest framework with optimal performance

## 🚀 Key Features

- **Professional Audio Player**: YouTube-style controls with buffering visualization, seeking, and quality selection (preview/streaming/master)
- **Multi-Quality Streaming**: Automatic bandwidth optimization with file size estimation
- **Railway PocketBase**: Cloud-hosted database with real-time capabilities
- **Enhanced Track Display**: Rich metadata, streaming links, and cover artwork
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Full TypeScript**: Complete type safety throughout

## 🏗️ Tech Stack

- **Framework**: Next.js 15.5.2 with TypeScript
- **Styling**: Tailwind CSS with responsive design
- **Database**: Railway PocketBase (production cloud instance)
- **Audio Processing**: Multi-format support (WAV masters, MP3 streaming, preview files)
- **Icons**: FontAwesome Pro for enhanced UI
- **Image Optimization**: Next.js with remote pattern support

## �️ Audio Player Features

The StreamingAudioPlayer component provides:

1. **Quality Selection**:

   - Preview (30-60s, ~1-2MB)
   - Streaming (full track, optimized ~8-15MB)
   - Master (studio quality, 50-150MB WAV)

2. **Advanced Controls**:

   - Play/pause with visual feedback
   - Precise seeking with buffer visualization
   - Skip forward/backward (10s intervals)
   - Real-time duration and progress display
   - File size estimation for bandwidth planning

3. **Professional UI**:
   - YouTube-style progress bar with hover preview
   - Smooth animations and state transitions
   - Mobile-optimized touch controls
   - Loading and buffer state indicators

## �️ Database Schema

### PocketBase Collections

**selected_works** (23 tracks):

- `trackName`: Track title
- `artistName`: Artist name
- `releaseDate`: Release date (ISO format)
- `description`: Track description/notes
- `evanRole`: Evan's production role
- `highlighted`: Featured work flag
- `coverImage`: Album artwork (optimized images)
- `trackFile`: Master audio file (WAV, highest quality)
- `streamingFile`: Streaming audio (MP3/M4A, optimized)
- `previewFile`: Preview clip (30-60s sample)
- `spotifyLink`, `appleMusicLink`, `youtubeLink`, `soundCloudLink`, `tidalLink`: External platform URLs

## 🛠️ Development

### Environment Setup

```bash
# Install dependencies
npm install

# Environment configuration (.env.local)
NEXT_PUBLIC_POCKETBASE_URL=https://pocketbase-production-1aa6.up.railway.app

# Development server
npm run dev
```

### Project Structure

```
src/
├── components/
│   └── StreamingAudioPlayer.tsx  # Enhanced audio player
├── lib/
│   └── pocketbase.ts            # PocketBase SDK client
└── types/
    └── index.ts                 # TypeScript definitions
app/
├── layout.tsx                   # Root layout with navigation
├── page.tsx                     # Home page (featured works)
├── WorkCard.tsx                 # Track display component
└── works/
    └── page.tsx                 # Complete works gallery
```

## 🔧 Available Scripts

- `npm run dev` - Development server (port 3000)
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Code linting

### Utility Scripts

Located in `scripts/`:

- `test-connection.js` - Verify PocketBase connectivity
- `test-integration.js` - Test app integration
- `upload-media.js` - Batch upload media files

## 🚀 Deployment

**Current Setup**: Development runs locally, database hosted on Railway

**Production Deployment Options**:

- Vercel (recommended for Next.js)
- Railway (full-stack hosting)
- Self-hosted with Docker

## 📊 Performance

- **Initial Load**: ~142kB optimized bundle
- **Image Optimization**: Next.js automatic WebP conversion
- **Audio Streaming**: Progressive loading with quality selection
- **Database**: Real-time sync with Railway PocketBase
- **Build Time**: ~3 seconds for production build

## � External Links

- **Railway PocketBase**: [Production Database](https://pocketbase-production-1aa6.up.railway.app)
- **Admin Interface**: Access via Railway dashboard
- **API Documentation**: PocketBase auto-generated docs

---

**Built with ❤️ for professional audio portfolio presentation**
