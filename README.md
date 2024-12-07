# r.one

## Overview

This application provides a web-based solution for transcribing WAV audio files using Azure Speech-to-Text service. Built with Next.js and a Fastify backend, the app allows users to easily upload audio files and receive accurate transcriptions.

## Features

- User-friendly audio file upload interface
- Support for WAV audio file transcription
- Real-time transcription processing
- Azure Speech-to-Text integration
- Responsive Next.js frontend
- Efficient Fastify backend

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm or Yarn or pnpm
- Azure account with Speech Services enabled

## Technology Stack

- **Frontend**: Next.js 14
- **Backend**: Fastify
- **Transcription Service**: Azure Cognitive Services Speech-to-Text
- **Language**: TypeScript

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/git-0r/rone-client.git
   cd rone-client
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory with the following:
   ```
    AUTH0_SECRET=auth0_secret
    AUTH0_BASE_URL=auth0_base_url
    AUTH0_ISSUER_BASE_URL=auth0_issuer_base_url
    AUTH0_CLIENT_ID=auth0_client_id
    AUTH0_CLIENT_SECRET=auth0_client_secret
    NEXT_PUBLIC_SERVER_URL=server_url
    AUTH0_AUDIENCE=server_url
    BLOB_READ_WRITE_TOKEN=vercel_blob_token
   ```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm run dev
```

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
#or
pnpm run build
pnpm start
```

## Backend Endpoints

- `POST /upload`: Upload and transcribe WAV audio file
- `GET /history`: Retrieve transcription history

## Error Handling

The application includes comprehensive error handling for:

- File upload failures
- Transcription service errors
- Network issues

## Security Considerations

- File size limits implemented
- Supported audio file type restrictions
- Azure service authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
