import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
        <script>
          {`
            particlesJS.load('particles-js', '/particles.json', function() {
              console.log('particles.js loaded - callback');
            });
          `}
        </script>
      </body>
    </Html>
  )
}

