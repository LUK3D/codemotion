import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import './index.css'
import 'virtual:windi.css'
import { MantineProvider, Text } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={
    {
      colorScheme:'dark'
    }
    }>
      <App />
    </MantineProvider>
  </React.StrictMode>
)
