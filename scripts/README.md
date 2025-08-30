# PocketBase Integration Scripts

This directory contains utility scripts for managing your Railway PocketBase integration.

## Available Scripts

### `test-connection.js` - Database Connection Test

Tests connection to your Railway PocketBase instance and displays basic statistics.

```bash
node scripts/test-connection.js
```

### `test-integration.js` - Full Integration Test

Comprehensive test that verifies data access and displays track statistics.

```bash
node scripts/test-integration.js
```

### `upload-media.js` - Media File Upload

Uploads cover images and audio files to PocketBase records.

```bash
node scripts/upload-media.js
```

## Environment Configuration

Ensure your `.env.local` file contains:

```bash
# PocketBase Configuration (Railway)
NEXT_PUBLIC_POCKETBASE_URL=https://your-railway-app.railway.app

# Admin credentials (only needed for media uploads)
POCKETBASE_ADMIN_EMAIL=your-admin@example.com
POCKETBASE_ADMIN_PASSWORD=your-secure-password
```

## Current Status

✅ **Migration Complete** - All 23 tracks successfully imported  
✅ **Database Live** - Railway PocketBase running in production  
✅ **App Connected** - Next.js app pulling real data  
✅ **Public Access** - Collections configured for public read access

## Database Statistics

- **Total Tracks**: 23
- **Featured Tracks**: 6
- **Tracks with Spotify**: 17
- **Tracks with Apple Music**: 9
- **Tracks with YouTube**: 18
- **Tracks with Streaming Links**: 18

## File Structure

Your PocketBase collections:

- `selected_works` - Music tracks with metadata and streaming links
- `professional_details` - Contact information and bio

## Next Steps

1. Upload media files using `upload-media.js` script
2. Test your production deployment
3. Remove these utility scripts when no longer needed

## Troubleshooting

If you encounter issues:

1. Run `test-connection.js` to verify database connectivity
2. Run `test-integration.js` to check data integrity
3. Check Railway app logs for any backend issues
